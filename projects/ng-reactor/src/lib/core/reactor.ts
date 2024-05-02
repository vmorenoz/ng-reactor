import {GettersConfig, ReactorGetters, ReactorState, ReactorStore, StateConfig, StoreConfig} from "./reactor.types";
import {computed, signal} from "@angular/core";

export class Reactor<T extends Record<string, any>, U = any> {
  private state!: ReactorState;
  private getters!: ReactorGetters;

  constructor(initialState: StoreConfig<T, U>) {
    this.init(initialState);
  }

  static createStore<T extends Record<string, any>, U = any>(initialState: StoreConfig<T, U>): ReactorStore<T, U> {
    return new Reactor(initialState).getStore();
  }

  getStore(): ReactorStore<T, U> {
    return this.mergeObjects(this.state, this.getters) as ReactorStore<T, U>;
  }

  private init<T extends Record<string, any>, U = any>(initialState: StoreConfig<T, U>) {
    this.state = this.initReactorState(initialState.state);
    this.getters = this.initReactorGetters(initialState.getters || undefined);
  }

  private initReactorState<T>(obj: StateConfig<T>): ReactorState<T> {
    const signalObj: ReactorState<T> = {} as ReactorState<T>;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        (signalObj as any)[key] = signal((obj as any)[key]);
      }
    }
    return signalObj;
  }

  private initReactorGetters<T, U>(obj: GettersConfig<U> | undefined): ReactorGetters<U> {
    const computedObj: ReactorGetters<U> = {} as ReactorGetters<U>;
    if (obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          (computedObj as any)[key] = computed<U>(() => {
            const currentStateValues = this.getCurrentStateValues();
            return (obj as any)[key](currentStateValues);
          });
        }
      }
    }
    return computedObj;
  }

  private getCurrentStateValues<T>(): T {
    const stateValues: any = {};
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        stateValues[key] = this.state[key]();
      }
    }
    return stateValues;
  }

  private mergeObjects<T, U>(state: T, getters: U): T & U {
    return {...state, ...getters};
  }
}
