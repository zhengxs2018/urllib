import { HttpClientConfig } from "../types/mod.ts";

/**
 * @internal
 */
export const normalizeClientConfig = (
  init: string | URL | HttpClientConfig,
): HttpClientConfig => {
  if (typeof init === "string" || init instanceof URL) {
    return { baseURL: new URL(init).origin };
  }

  return init || {};
};
