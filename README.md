# NgReactor

NgReactor es una biblioteca de Angular que proporciona una forma sencilla y eficiente de manejar el estado de tu aplicación basado en signals.

## Instalación

Para instalar NgReactor, simplemente ejecuta el siguiente comando en tu terminal:

```bash
npm install ng-reactor
```

## Uso

Para usar NgReactor, primero debes importar `Reactor` en tu archivo:

```typescript
import { Reactor } from 'ng-reactor';
```

Luego, puedes crear un store con un estado inicial y getters opcionales:

```typescript
const store = Reactor.createStore({
    state: {name: 'John', lastName: 'Doe'},
    getters: {
        fullName: (state) => `${state.name} ${state.lastName}`
    }
});
```

Ahora puedes acceder y modificar el estado de tu store:

```typescript
store.name.set('Jane');
console.log(store.fullName()); // Logs: Jane Doe
```

## Importante

Si encuentras algún problema o tienes alguna sugerencia, no dudes en abrir un issue en nuestro repositorio de GitHub.

## Apoya el proyecto

Si te gusta NgReactor y encuentras útil esta biblioteca, por favor considera darle una estrella en GitHub. ¡Tu apoyo significa mucho!

[NgReactor en GitHub](https://github.com/vmorenoz/ng-reactor)
