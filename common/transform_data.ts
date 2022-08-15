import type { HttpRequestOptions } from "../types/request.ts";

export const transformData = (
  response: Response,
  config: HttpRequestOptions,
) => {
  const [onTransformResolution, onReject] = config.transformResponse;

  return Promise.resolve().then(
    () => onTransformResolution(response, config),
    onReject,
  );
};
