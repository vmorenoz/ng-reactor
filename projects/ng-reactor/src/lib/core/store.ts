import {
  ComputedFunc,
  GettersConfig,
  ReactorGetters,
  ReactorState,
  ReactorStore,
  StateConfig,
  StoreConfig
} from "./reactor.types";
import {computed, signal} from "@angular/core";

export class Store<T extends Record<string, any>, U = any> {
  private state: ReactorState = {};
  private getters: ReactorGetters = {};

  constructor(initialState: StoreConfig<T, U>) {
    this.init(initialState);
  }

  getStore(): ReactorStore<T, U> {
    return {...this.state, ...this.getters} as ReactorStore<T, U>;
  }

  private init(initialState: StoreConfig<T, U>) {
    this.state = this.initReactorState(initialState.state);
    this.getters = initialState.getters ? this.initReactorGetters(initialState.getters) : {};
  }

  private initReactorState(obj: StateConfig<T>): ReactorState<T> {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, signal(value)])) as ReactorState<T>;
  }

  private initReactorGetters(obj: GettersConfig<T, U>): ReactorGetters<U> {
    return Object.fromEntries(Object.entries(obj).map(([key, getter]) => {
      const computedFunc: ComputedFunc<StateConfig, U[keyof U]> = getter as ComputedFunc<StateConfig, U[keyof U]>;
      return [key, computed(() => computedFunc(this.getCurrentStateValues()))]
    })) as ReactorGetters<U>;
  }

  private getCurrentStateValues(): T {
    return Object.fromEntries(Object.entries(this.state).map(([key, value]) => [key, value()])) as T;
  }
}
