# <center>INJECTIONS DE DEPENDANCES
                        
<br>


### METHODE USE-FACTORY

Dans le service si j'ai un constructeur qui attend des paramètres :

```php
constructor(private http: HttpClient, public montant: number) {}
```
    

Dans mon module je dois avoir, là où je veux l'instancier par injection de dépendance :
```php
providers: [{
    provide: CustomersServices,
    useFactory: (http:HttpClient) => {
    return new CustomersServices(http, 30)
    },
    deps: [HttpClient]
}]
```
    


-----------------------

### METHODE JETON D'INJECTION

Dans le service si j'ai un constructeur qui attend des paramètres :
```php
constructor(
    private http: HttpClient,
    @Inject('CUSTOMERS_PRENOM')public prenoms: string[]
) {}
```

    

Dans mon module je dois avoir, là où je veux l'instancier par injection de dépendance :

```php
providers: [
    {
        provide: 'CUSTOMERS_PRENOMS',
        useValue: 'Ugo',
        multi: true,
    },
    {
        provide: 'CUSTOMERS_PRENOMS',
        useValue: 'Stephane',
        multi: true,
    }
]
```
    


-------------------------

### METHODE PAR ABSTRACTION

Cette méthode est utilisée pour pour faire une **inversion de dépendance**. Le but est de partir d'une interface qui va définir des méthodes obligatoires pour notre service pour faire des test. Ensuite le service devra implémenter cette **interface** : 

    class CustomersServiceUpdated implements [CustomerApiInterface]
    class CustomersServices implements [CustomerApiInterface]


Dans mon composant, pour appeler UN service (de type interface, donc abstrait), le constructeur devra avoir le décorateur @Inject:

    @Inject('CUSTOMERS_API') private service: CustomerApiInterface


Pour finir, mon module aura alors le choix de faire appel a un des deux services créés, pour choisir lequel sera injecté, de cette manière :

```php
providers: [
    {
        CustomersServices,
        CustomersServiceUpdated,
    },
    {
    provide: 'CUSTOMERS_API',
    useClass: CustomersServiceUpdated
    }
]
```
