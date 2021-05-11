import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthModule} from "../auth.module";
import {Router, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {of, throwError} from "rxjs";

describe('LoginComponent', () => {

  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let document: HTMLElement;

  let usernameInput:HTMLInputElement;
  let passwordInput:HTMLInputElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, ReactiveFormsModule, RouterModule.forRoot([])],
    });

    authService = TestBed.inject(AuthService); // GIVEN
    router = TestBed.inject(Router); // GIVEN

    fixture = TestBed.createComponent(LoginComponent);
    document = fixture.nativeElement;
    usernameInput = document.querySelector('input[name=username]');
    passwordInput = document.querySelector('input[name=password]');

    fixture.detectChanges(); // Détecte les changements sur notre Composant fictif (LoginComponent)
  })


  /**
   * 1ER TEST -- Composant correctement créé ?
   */
  it('should be created', async () => {
    expect(fixture.componentInstance).toBeTruthy();
  });


  /**
   * 2EME TEST -- Form + 2 inputs attendus
   */
  it('should display a form with 2 inputs', async () => {
    // THEN -- balise form ?
    expect(document.querySelector('form')).toBeTruthy();

    // THEN -- resultats sur l'input username
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.getAttribute('type')).toBe('email');

    // THEN -- resultats sur l'input password
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.getAttribute('type')).toBe('password');

  });


  /**
   * 3EME TEST : Bon identifiants = redirection
   */
  it('Should redirect if credentials are OK', () => {

    const spyOnRouter = spyOn(router, 'navigateByUrl');
    const spyOnAuth = spyOn(authService, 'authenticate').and.returnValue(of('MOCK_TOKEN'));

    usernameInput.value = 'mail@mail.com';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));
    document.querySelector('button').click();

    expect(spyOnAuth).toHaveBeenCalledWith({
      username: 'mail@mail.com',
      password: 'password'
    })
    expect(spyOnRouter).toHaveBeenCalledWith('/customers');

  })

  /**
   * 4EME TEST -- Mauvais identifiants = pas de redirection
   */
  it('Should not redirect if credentials are BAD', () => {

    spyOn(authService, 'authenticate').and.returnValue(throwError('BAD CREDENTIALS'));
    const spyOnRouter = spyOn(router, 'navigateByUrl');

    expect(document.querySelector('.alert-danger')).not.toBeTruthy();

    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    document.querySelector('button').click();

    fixture.detectChanges();

    expect(spyOnRouter).not.toHaveBeenCalled();
    expect(document.querySelector('.alert-danger')).toBeTruthy();
    expect(document.querySelector('.alert-danger').textContent).toBe('Connexion impossible, merci de réessayer');
  })

});
