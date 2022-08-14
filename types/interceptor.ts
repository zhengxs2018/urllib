// deno-lint-ignore-file no-explicit-any
export interface HttpInterceptor<V, T = V> {
  fulfilled?: (value: V) => T | Promise<T>;
  rejected?: (error: any) => any;
}

export interface HttpInterceptorManager<V> {
  use<T = V>(
    onFulfilled?: (value: V) => T | Promise<T>,
    onRejected?: (error: any) => any,
  ): number;
  eject(id: number): void;
  forEach(callbackFn: (value: HttpInterceptor<V, any>) => void): void;
  apply<T = V>(value: T): Promise<T>;
}
