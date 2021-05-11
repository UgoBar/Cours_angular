import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { AuthModule } from "./auth.module";

describe('AuthGuard', () => {
  let authService: AuthService;
  let authGuard: AuthGuard;
  let router: Router;
  let spyRouter: jasmine.Spy ;

  beforeEach( async() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, RouterModule.forRoot([])]
    });

    authService = TestBed.inject(AuthService); // GIVEN
    authGuard = TestBed.inject(AuthGuard); // GIVEN
    router = TestBed.inject(Router); // GIVEN
    spyRouter = spyOn(router, 'navigateByUrl'); // GIVEN
  })

  it('Should return true if token found', async () => {

    spyOn(authService, 'isAuthenticated').and.returnValue(true); // GIVEN -- on remplace la méthode getToken avec une fausse valeur

    const result = authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) // WHEN

    expect(result).toBeTrue(); // THEN
    expect(spyRouter).not.toHaveBeenCalled(); // THEN
  })

  it('Should should redirect to /login if token not found', async () => {

    spyOn(authService, 'isAuthenticated').and.returnValue(false); // GIVEN -- on remplace la méthode getToken avec une fausse valeur

    authGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) // WHEN

    expect(spyRouter).toHaveBeenCalledWith('/login'); // THEN
  })
});
