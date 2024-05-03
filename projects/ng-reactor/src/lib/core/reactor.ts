import {ReactorStore, StoreConfig} from "./reactor.types";
import {Store} from "./store";

export class Reactor {
  static createStore<T extends Record<string, any>, U = any>(initialState: StoreConfig<T, U>): ReactorStore<T, U> {
    return new Store(initialState).getStore();
  }
}
