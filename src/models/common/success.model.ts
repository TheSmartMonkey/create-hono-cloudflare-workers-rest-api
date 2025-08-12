export type HttpSuccessStatusCode = 200;

export type HttpSuccessDescription = 'OK_SUCCESS';

export type SuccessOutput<T> = {
  success: true;
  data: T;
};
