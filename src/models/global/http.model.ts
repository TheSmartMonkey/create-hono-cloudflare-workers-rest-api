export type HttpStatusCode = 200 | 400 | 401 | 403 | 404 | 500;

export class HttpError {
  status: HttpStatusCode;
  message: Uppercase<string>;

  constructor(status: HttpStatusCode, message: Uppercase<string>) {
    this.status = status;
    this.message = message;
  }
}

export type HttpErrorResponse = {
  status: HttpStatusCode;
  message: Uppercase<string>;
  error: any;
};

export type HttpResponse<TDATA> = {
  status: HttpStatusCode;
  message: Uppercase<string>;
  data: TDATA;
};
