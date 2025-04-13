export type HttpOutput<TDATA> = {
  message: Uppercase<string>;
  data: TDATA;
};

type HttpErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 500;

export class HttpError extends Error {
  status: HttpErrorStatusCode;

  constructor(status: HttpErrorStatusCode, message: Uppercase<string>) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(400, message);
    this.message = message + '_BAD_REQUEST_ERROR';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(401, message);
    this.message = message + '_UNAUTHORIZED_ERROR';
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(403, message);
    this.message = message + '_FORBIDDEN_ERROR';
  }
}

export class NotFoundError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(404, message);
    this.message = message + '_NOT_FOUND_ERROR';
  }
}

export class ConflictError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(409, message);
    this.message = message + '_CONFLICT_ERROR';
  }
}

export class InternalServerError extends HttpError {
  constructor(message: Uppercase<string>) {
    super(500, message);
    this.message = message + '_INTERNAL_SERVER_ERROR';
  }
}
