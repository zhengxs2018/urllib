// deno-lint-ignore-file
import type {
  HttpInterceptor,
  HttpInterceptorManager,
} from "../types/interceptor.ts";

export const createInterceptorManager = <V>(): HttpInterceptorManager<V> => {
  const handlers: Array<HttpInterceptor<V, any> | null> = [];

  const forEach = (
    callbackFn: (value: HttpInterceptor<V, any>) => void,
  ): void => {
    for (const h of handlers) {
      if (h !== null) callbackFn(h);
    }
  };

  const eject = (id: number): void => {
    if (handlers[id]) {
      handlers[id] = null;
    }
  };

  const use = <T = V>(
    fulfilled?: (value: V) => T | Promise<T>,
    rejected?: (error: any) => any,
  ): number => {
    handlers.push({
      fulfilled,
      rejected,
    });
    return handlers.length - 1;
  };

  const apply = <T = any>(value: T) => {
    let promise = Promise.resolve(value);

    handlers.forEach((h) => {
      if (!h) return;
      const { fulfilled, rejected } = h;

      // @ts-ignore 类型需要重新设计
      promise = promise.then(fulfilled, rejected);
    });

    return promise;
  };

  const manager: HttpInterceptorManager<V> = {
    use,
    eject,
    forEach,
    apply,
  };

  return manager;
};
