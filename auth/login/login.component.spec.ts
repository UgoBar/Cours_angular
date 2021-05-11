import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthModule} from "../auth.module";
import {Router, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {of} from "rxjs";

describe('LoginComponent', () => {

  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let document: HTMLElement;

  let usernameInput:HTMLInputElement;
  let passwordInput:HTMLInputElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, ReactiveFormsModule, RouterModule.forRoot([])],
    });

    authService = TestBed.inject(AuthService); // GIVEN

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
   * 3EME TEST : redirection
   */
  it('Should redirect if credentials are OK', () => {

    const router: Router = TestBed.inject(Router);
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
   * 4EME TEST -- Mauvais identifiants
   */
  it('Should not redirect if credentials are BAD', () => {

    spyOn(authService, 'authenticate').and.returnValue(of('MOCK_TOKEN'));

    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    document.querySelector('form').click();

    expect(fixture.componentInstance.form.value).toEqual({
      username: '',
      password: ''
    })
  })

});
