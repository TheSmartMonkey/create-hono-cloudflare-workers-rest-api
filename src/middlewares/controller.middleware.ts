import { HttpError, HttpResponse } from '@/models/global/http.model';
import { User } from '@/models/user.model';
import { Context, TypedResponse } from 'hono';
import { HTTPException } from 'hono/http-exception';

export function controller<T>(
  callback: ({ body, params, queryParams, user }: { body: any; params: any; queryParams: any; user: User }) => Promise<T>,
): (c: Context) => Promise<Response & TypedResponse> {
  return async (c: Context): Promise<Response & TypedResponse> => {
    try {
      const body = await parseBody(c);
      const params = c.req.param();
      const queryParams = c.req.query();
      const user = c.get('user');

      const data: T = await callback({ body, params, queryParams, user });
      const response: HttpResponse<T> = {
        message: camelToUppercaseSnakeCase(callback.name),
        data,
      };
      return c.json(response);
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HTTPException(error?.status, { message: error?.message, cause: error });
      }
      throw new HTTPException(500, { message: 'UNKNOWN_ERROR', cause: error });
    }
  };
}

function camelToUppercaseSnakeCase(str: string): Uppercase<string> {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).toUpperCase() as Uppercase<string>;
}

function parseBody(c: Context): Promise<any> {
  const method = c.req.method;
  if (method === 'GET' || method === 'HEAD') {
    return Promise.resolve({});
  }

  const contentType = c.req.header('content-type');
  if (contentType?.includes('application/json')) {
    return c.req.json();
  }
  return Promise.resolve({});
}
