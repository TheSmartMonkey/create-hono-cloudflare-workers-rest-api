export type HttpErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 500;
export type HttpErrorDescription =
  | 'BAD_REQUEST_ERROR'
  | 'UNAUTHORIZED_ERROR'
  | 'FORBIDDEN_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'CONFLICT_ERROR'
  | 'INTERNAL_SERVER_ERROR';

export type ErrorOutput = {
  success: false;
  error: {
    issues?: string[];
    name: string;
  };
};

/**
 * @description Http Error
 * @param status - Http error status
 * @param message - Error message
 */
export class HttpError extends Error {
  status: HttpErrorStatusCode;

  constructor(status: HttpErrorStatusCode, message: Uppercase<string>) {
    super(message);
    this.status = status;
  }
}

/**
 * @description Bad Request Error (400)
 * @param message - Error message
 */
export class BadRequestError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(400, message);
    this.message = message + '_BAD_REQUEST_ERROR';
  }
}

/**
 * @description Unauthorized Error (401)
 * @param message - Error message
 */
export class UnauthorizedError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(401, message);
    this.message = message + '_UNAUTHORIZED_ERROR';
  }
}

/**
 * @description Forbidden Error (403)
 * @param message - Error message
 */
export class ForbiddenError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(403, message);
    this.message = message + '_FORBIDDEN_ERROR';
  }
}

/**
 * @description Not Found Error (404)
 * @param message - Error message
 */
export class NotFoundError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(404, message);
    this.message = message + '_NOT_FOUND_ERROR';
  }
}

/**
 * @description Conflict Error (409)
 * @param message - Error message
 */
export class ConflictError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(409, message);
    this.message = message + '_CONFLICT_ERROR';
  }
}

/**
 * @description Internal Server Error (500)
 * @param message - Error message
 */
export class InternalServerError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(500, message);
    this.message = message + '_INTERNAL_SERVER_ERROR';
  }
}
