import { HttpException } from "./HttpException.ts";

export const isHttpException = (value: unknown): value is HttpException =>
  value ? value instanceof HttpException : false;
