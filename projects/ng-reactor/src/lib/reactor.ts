import {computed, Signal, signal, WritableSignal} from "@angular/core";

export namespace Reactor {

  type ComputedFunc<T, U> = (state: T) => U;
  type ComputedDefinition<T, U> = { [K in keyof U]: ComputedFunc<T, U[K]> };
  type StateAsSignalObject<T> = { [K in keyof T]: WritableSignal<T[K]> };
  type GettersAsComputedObject<U> = { [K in keyof U]: Signal<U[K]> };

  interface StoreConfig<T = any, U = any> {
    state: T;
    getters?: ComputedDefinition<T, U>;
  }

  export function createStore<T extends Record<string, any>, U = any>(name: string, initialState: StoreConfig<T, U>): StateAsSignalObject<T> & GettersAsComputedObject<U> {
    const stateAsSignals = _convertToSignalObject(initialState.state);
    const gettersAsComputed = _convertToComputedObject(initialState.getters || undefined, stateAsSignals);

    return _mergeObjects(stateAsSignals, gettersAsComputed);
  }

  function _convertToSignalObject<T>(obj: Record<string, T>): StateAsSignalObject<T> {
    const signalObj: StateAsSignalObject<T> = {} as StateAsSignalObject<T>;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        (signalObj as any)[key] = signal((obj as any)[key]);
      }
    }
    return signalObj;
  }

  function _convertToComputedObject<T, U>(obj: ComputedDefinition<T, U> | undefined, state: StateAsSignalObject<T>): GettersAsComputedObject<U> {
    const computedObj: GettersAsComputedObject<U> = {} as GettersAsComputedObject<U>;
    if (obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          (computedObj as any)[key] = computed<U>(() => {
            const currentStateValues = _getCurrentStateValues(state);
            return (obj as any)[key](currentStateValues);
          });
        }
      }
    }
    return computedObj;
  }

  function _getCurrentStateValues<T>(state: StateAsSignalObject<T>): T {
    const stateValues: any = {};
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        stateValues[key] = state[key]();
      }
    }
    return stateValues;
  }

  function _mergeObjects<T, U>(state: T, getters: U): T & U {
    return {...state, ...getters};
  }
}
