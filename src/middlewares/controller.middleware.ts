import { logger } from '@src/helpers/logger';
import { HttpError, HttpResponse } from '@src/models/global/http.model';
import { Context, TypedResponse } from 'hono';
import { HTTPException } from 'hono/http-exception';

export function controller<T>(
  callback: ({ body, params, queryParams }: { body: any; params: any; queryParams: any }) => Promise<T>,
  logResponse = true,
): (c: Context) => Promise<Response & TypedResponse> {
  return async (c: Context): Promise<Response & TypedResponse> => {
    try {
      const body = await c.req.parseBody();
      const params = c.req.param();
      const queryParams = c.req.query();
      const data: T = await callback({ body, params, queryParams });
      const response: HttpResponse<T> = {
        status: 200,
        message: camelToUppercaseSnakeCase(callback.name),
        data,
      };
      if (logResponse) {
        logger.info(response);
      }
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
