import {Signal, WritableSignal} from "@angular/core";

export type ComputedFunc<T, U> = (state: T) => U;

export type StateConfig<T = any> = { [K in keyof T]: T[K] };
export type GettersConfig<T=any, U = any> = { [K in keyof U]: ComputedFunc<StateConfig<T>, U[K]> };
export type StoreConfig<T = any, U = any> = { state: StateConfig<T>; getters?: GettersConfig<T, U> };

export type ReactorState<T = any> = { [K in keyof T]: WritableSignal<T[K]> };
export type ReactorGetters<T = any> = { [K in keyof T]: Signal<T[K]> };
export type ReactorStore<T, U> = ReactorState<T> & ReactorGetters<U>;
