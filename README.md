# NgReactor

NgReactor es una biblioteca de Angular que proporciona una forma sencilla y eficiente de manejar el estado de tu aplicación.

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

Luego, puedes crear una tienda con un estado inicial y getters opcionales:

```typescript
const store = Reactor.createStore('testStore', {
  state: { count: 0 },
  getters: { doubleCount: state => state.count * 2 }
});
```

Ahora puedes acceder y modificar el estado de tu store:

```typescript
store.count.set(2);
console.log(store.doubleCount()); // Logs: 4
```

## Contribuir

Si encuentras algún problema o tienes alguna sugerencia, no dudes en abrir un issue en nuestro repositorio de GitHub.

## Apoya el proyecto

Si te gusta NgReactor y encuentras útil esta biblioteca, por favor considera darle una estrella en GitHub. ¡Tu apoyo significa mucho!

[¡Dale una estrella a NgReactor en GitHub!](https://github.com/vmorenoz/ng-reactor)
