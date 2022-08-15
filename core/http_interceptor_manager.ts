// deno-lint-ignore-file

/**
 * @internal
 */
export interface HttpInterceptor<V, T = V> {
  fulfilled?: (value: V) => T | Promise<T>;
  rejected?: (error: any) => any;
}

/**
 * @internal
 */
export class HttpInterceptorManager<V> {
  handlers: Array<HttpInterceptor<V, any> | null> = [];

  use<T = V>(
    fulfilled?: (value: V) => T | Promise<T>,
    rejected?: (error: any) => any,
  ): number {
    this.handlers.push({
      fulfilled,
      rejected,
    });
    return this.handlers.length - 1;
  }

  eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  forEach(callbackFn: (value: HttpInterceptor<V, any>) => void): void {
    for (const h of this.handlers) {
      if (h !== null) callbackFn(h);
    }
  }

  apply<T = V>(value: T): Promise<T> {
    let promise = Promise.resolve(value);

    this.handlers.forEach((h) => {
      if (!h) return;
      const { fulfilled, rejected } = h;

      // @ts-ignore 类型需要重新设计
      promise = promise.then(fulfilled, rejected);
    });

    return promise;
  }
}
