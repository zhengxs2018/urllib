import type { HttpRequestOptions } from "../types/mod.ts";

import { HttpException } from "./http_exception.ts";

/**
 * 创建 Response 对象
 *
 * @internal
 */
export const createHttpResponse = async (
  request: Request,
  config: HttpRequestOptions,
): Promise<Response> => {
  const body = config.body == null ? undefined : config.body;

  const response = await fetch(request, { body });

  if (config.validateStatus(response.status, response) === false) {
    throw new HttpException(
      "Request failed with status code " + response.status,
      -1,
      config,
      request,
      response,
    );
  }

  return response;
};
