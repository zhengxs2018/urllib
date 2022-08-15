import type { HttpClientConfig } from "../types/mod.ts";

import { HttpClient } from "./http_client.ts";
import { normalizeClientConfig } from "./normalize_client_config.ts";

export const createHttpClient = (
  urlOrConfig: string | URL | HttpClientConfig,
): HttpClient => new HttpClient(normalizeClientConfig(urlOrConfig));
