import {Reactor} from './reactor';
import any = jasmine.any;

describe('Reactor', () => {
  let reactor: typeof Reactor;

  beforeEach(() => {
    reactor = Reactor;
  });

  it('should create a store with initial state', () => {
    const store = reactor.createStore('testStore', {state: {count: 0}});
    expect(store.count()).toEqual(0);
  });

  it('should create a store with computed properties', () => {
    const store = reactor.createStore('testStore', {
      state: {count: 0},
      getters: {doubleCount: state => state.count * 2}
    });
    expect(store.doubleCount()).toEqual(0);
  });

  it('should update computed properties when state changes', () => {
    const store = reactor.createStore('testStore', {
      state: {count: 0},
      getters: {doubleCount: state => state.count * 2}
    });
    store.count.set(2);
    const doubleCount = store.doubleCount();
    expect(doubleCount).toEqual(4);
  });

  it('should merge state and getters into a single object', () => {
    const store = reactor.createStore('testStore', {
      state: {count: 0},
      getters: {doubleCount: state => state.count * 2}
    });
    expect(store).toEqual({count: any(Function), doubleCount: any(Function)});
  });
});
