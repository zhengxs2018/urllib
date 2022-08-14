import { HttpRequestOptions } from "../types/request.ts";

export class HttpException extends Error {
  name = "HttpException" as const;

  isHttpError = false as const;

  constructor(
    message: string,
    public code: number,
    public config: HttpRequestOptions,
    public request: Request,
    public response: Response,
  ) {
    super(message);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      // Mozilla
      stack: this.stack,
      // Http
      config: this.config,
      code: this.code,
      status: this.response && this.response.status
        ? this.response.status
        : null,
    };
  }

  static from(
    error: Error,
    code: number,
    config: HttpRequestOptions,
    request: Request,
    response: Response,
  ): HttpException {
    const httpException = new HttpException(
      error.message,
      code,
      config,
      request,
      response,
    );

    httpException.stack = error.stack;

    return httpException;
  }

  static throw(
    reason: string | Error | HttpException,
    code: number,
    config: HttpRequestOptions,
    request: Request,
    response: Response,
  ): never {
    const error = typeof reason === "string" ? new Error(reason) : reason;

    if (error instanceof HttpException) throw reason;

    throw HttpException.from(error, code, config, request, response);
  }
}
