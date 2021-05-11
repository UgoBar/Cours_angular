## TEST UNITAIRES SUR ANGULAR</h2> 




*L'idée de ces test est de simuler des comportements en testant des classes, des modules, des méthodes etc... tout ce qui peut être tester ! Plus globalement le but ici est de tester massivement toute l'application afin d'être serein la prochaine fois que l'on ajoute une fonctionnalité : nos test seront toujours là et nous retournerons ou non des erreurs.*

Rendu sur vscode : ```ctrl+k v```

-----------------------

### <center> Les méthodes :

##### Méthodes de test

- **```describe()```**
Défini la classe, fonction ou la méthode que l'on est en train de tester, dans lequel il y aura une suite de test.
<br>

- **```beforeEach()```**
Défini des actions à effectuer avant chaque test. C'est ici que l'on va mettre des éléments nécessaires à plusieurs test afin de factoriser notre code.
<br>

- **```it()```**
C'est dans cette fonction que l'on va faire des tests : on va instancier notre classe, faire appel à nos méthodes en simulant les différents éléments nécessaires comme des paramètres de fonctions ou des dépendances dans un constructeur. Le paramètre de ce "it" doit contenir une chaine de caractère qui serait une phrase décrivant le comportement attendu. <br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A l'intérieur de cette fonction on s'attend à avoir : <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - *Given :* Etant donné - ce dont on a besoin (il peut y en avoir plusieurs) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - *When :*  Quand on appelle la méthode ou la fonction à tester <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - *Then :*  Le resultat qui est attendu avec la méthode **```expect```**
<br>

- **```expect()```**
à l'intérieur du it : C'est le resultat attendu, finalement, le *'Then'*. Plusieurs fonctions peuvent être appelées pour faire des vérifications. La liste serait trop longue à faire ici et des documentations à ce sujet existe. On peut noter néanmoins les plus utilisées : <br>
```toBeTruthy() -> qui existe```  |  ```toBe(valeur attendu)```  |  ```toBeTruth() -> return true``` <br>
```toHaveBeenCalledWith(valeur attendu)```  |  ```toHaveBeenCalled() -> qui a été appellé```

<br>

*documentation* : <a href="https://angular.io/guide/testing-services">Tester les services</a> | <a href="https://angular.io/guide/testing-components-basics">Tester les Composants</a>

<br>

##### Méthodes de simulation

- **```TestBed.configureTestingModule```**
Simule l'instanciation de notre module. Attend en paramètre un objet de type module avec les imports, exports, providers etc..
<br>

- **```TestBed.inject()```**
Simule l'injection de service dans notre classe
<br>

- **```TestBed.createComponent()```**
Simule la création d'un composant, d'une "fixture". Par exemple :<br>
```fixture = TestBed.createComponent(LoginComponent);```
<br>

- **```detectChanges()```**
Détecte les changements sur notre Composant fictif, de notre "fixture"
<br>

- **```spyOn(service | class, 'méthode');```**
Cette méthode nous permet de simuler la méthode d'un service sans toucher à ce dernier. Par exemple on pourrait simuler la méthode ```navigateByUrl``` du Router : <br>
&nbsp;```spyOn(TestBed.inject(Router), 'navigateByUrl');```



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
