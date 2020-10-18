# either-functor-example-sanctuary

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/either-functor-example-sanctuary)
 
We have created a simple custom Either type but now we are going to switch again to Sanctuary.js library which provides an [Either](https://github.com/sanctuary-js/sanctuary#-either) type .

The Either has the usual two Cases named `S.Right` and `S.Left`. Other that that we have a  [`map`](https://github.com/sanctuary-js/sanctuary#map--functorf--a-b---fa---fb) method and a **pattern matching** method called [` S.either`](https://github.com/sanctuary-js/sanctuary#either--a-c---b-c---eitherab---c)  (Take a moment and observe the type of this function [`(a -⁠> c) -⁠> (b -⁠> c) -⁠> Either a b -⁠> c`](https://github.com/sanctuary-js/sanctuary/blob/v3.1.0/index.js#L2333) and compare it with the elimination rule of the co-product seen in the Algebraic Data Types chapter)

```javascript
 S.either(error => {...})(result => {...})
```

we can also use the Sanctuary  [`S.head`](https://github.com/sanctuary-js/sanctuary#head--foldablef--fa---maybea) method that returns a Sanctuary Maybe type:

```javascript
var Repository = {
  getById: id => S.head(Clients.filter(client => client.id == id)) //returns a S.Just<T>
};
```

The full refactored example now looks like this :

```javascript
  // composing functions
var getClientNameById = id =>
    S.either(e => `error : ${e}`)(result => `client name:${result}`)(   //String
      S.maybeToEither(`no client found`)(                                //S.Either<String,String>
        S.map(Client.name)                                               //S.Maybe<String>
          (Repository.getById(id))                                        //S.Maybe<Client>
  )
);
```

 [Run this](https://stackblitz.com/edit/either-functor-example-sanctuary?file=index.js) 

or we can use the pipe operation in order to somwhow  simplify the syntax:

```javascript
  var getClientNameById = id =>
    S.pipe([
      S.maybeToEither(`no client found`),
      S.map(Client.name),
      S.either(e => `error : ${e}`)
        (result => `client name:${result}`) //this is the pattern matching paradoxically 
    ])(Repository.getById(id));
```

 [Run this](https://stackblitz.com/edit/either-functor-example-sanctuary?file=index.js) 