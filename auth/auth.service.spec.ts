import { AuthModule } from "./auth.module";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('AuthService',  () => {

  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule]
    });

    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);

    window.localStorage.clear();
  });

  // 1ER TEST - création du service
  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  // 2EME TEST - AUTHENTICATE
  it('should return an observable with API token',() => {

    expect(window.localStorage.getItem('token')).toBeNull();

    service.authenticate({username: 'MOCK_USER', password: 'password'}).subscribe({
      next: apiToken => {
        expect(apiToken).toBe('MOCK_TOKEN');
        expect(window.localStorage.getItem('token')).toBe('MOCK_TOKEN');
      }
    })
    const req = http.expectOne('http://localhost:3000/api/login_check');

    req.flush({token: 'MOCK_TOKEN'})

  })

  // 3EME TEST - GET TOKEN
  it('should retrieve token from localStorage', () => {
    window.localStorage.setItem('token', 'un token');
    const token = service.getToken();
    expect(token).toBe('un token')
  })

  // 4EME TEST - LOGOUT
  it('should remove the localStorage', () => {
    window.localStorage.setItem('token', 'un token');
    service.logout();
    expect(window.localStorage.getItem('token')).toBe(null)
  })

  // 5EME TEST - IS AUTHENTICATED
  it('should guess if user is authenticated or not', () => {
    window.localStorage.setItem('token', 'un token');
    expect(service.isAuthenticated()).toBeTrue();

    window.localStorage.removeItem('token');
    expect(service.isAuthenticated()).toBeFalse();
  })
});
