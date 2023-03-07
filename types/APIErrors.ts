import { ApiError } from "next/dist/server/api-utils";

class InternalError extends ApiError {
  constructor(message?: string) {
    super(500, message || "Internal error");
  }
}

class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(400, message || "Bad request");
  }
}

export const APIErrors = { InternalError, BadRequestError };