# <center> TEST UNITAIRES ANGULAR


 ---------------------------- 

*L'idée de ces test est de simuler des comportements en testant des classes, des modules, des méthodes etc... tout ce qui peut être tester ! Plus globalement le but ici est de tester massivement toute l'application afin d'être serein la prochaine fois que l'on ajoute une fonctionnalité : nos test seront toujours là et nous retournerons ou non des erreurs.*
<br>Rendu : ```ctrl+k v```

-----------------------

### <center> Les méthodes :

- **```describe()```**
Défini la classe, fonction ou la méthode que l'on est en train de tester, dans lequel il y aura une suite de test.
<br>

- **```beforeEach()```**
Défini des actions à effectuer avant chaque test
<br>

- **```it()```**
C'est dans cette fonction que l'on va faire des tests : on va instancier notre classe ou faire appel à nos méthodes en simulant les différents éléments nécessaires comme des paramètres de fonctions ou des dépendances dans un constructeur. Le paramètre de ce "it" doit contenir une chaine de caractère qui est une phrase qui décrit le comportement attendu. <br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A l'intérieur de cette fonction on s'attend à avoir :
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - *Given :* Etant donné - ce dont on a besoin (il peut y en avoir plusieurs)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - *When :*  Quand on appelle la méthode ou la fonction à tester
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - *Then :*  Le resultat qui est attendu avec la méthode **```expect```**
<br>

- **```expect()```**
à l'intérieur du it : C'est le resultat attendu, finalement, le *'Then'*

<br>

##### Exemple du test de notre <a href="https://github.com/UgoBar/Cours_angular/blob/main/auth/auth.guard.ts">AuthGuard.ts</a>

```javascript
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
```

d'autres exemple ici : 
- <a href="https://github.com/UgoBar/Cours_angular/blob/main/auth/login/login.component.spec.ts">login.component.spec.ts</a>
- <a href="https://github.com/UgoBar/Cours_angular/blob/main/auth/auth.service.spec.ts">auth.service.spec.ts</a>


-------

### <center> Dans la console :

```npm install karma-spec-reporter --save-dev``` pour installer le framework Karma

```ng test``` lance les test

```ng test --browsers=ChromeHeadless``` lance les test sans le navigateur

```ng test --browsers=ChromeHeadless --reporters=spec``` en utilisant Karma (+ visuel dans la console !)
