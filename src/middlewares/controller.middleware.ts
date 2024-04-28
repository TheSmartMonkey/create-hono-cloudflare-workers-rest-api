import { EnvVariables } from '@src/helpers/env';
import { logger } from '@src/helpers/logger';
import { HttpError, HttpResponse } from '@src/models/global/http.model';
import { User } from '@src/models/user.model';
import { Context, TypedResponse } from 'hono';
import { HTTPException } from 'hono/http-exception';

export function controller<T>(
  callback: ({
    body,
    params,
    queryParams,
    user,
  }: {
    body: any;
    params: any;
    queryParams: any;
    user: User;
    env: EnvVariables;
  }) => Promise<T>,
  logResponse = true,
): (c: Context) => Promise<Response & TypedResponse> {
  return async (c: Context): Promise<Response & TypedResponse> => {
    try {
      const body = await c.req.parseBody();
      const params = c.req.param();
      const queryParams = c.req.query();
      const user = c.get('user');
      const env: EnvVariables = c.env;
      const data: T = await callback({ body, params, queryParams, user, env });
      const response: HttpResponse<T> = {
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
