import { OpenAPIHono } from '@hono/zod-openapi';
import { route } from './middlewares/open-api.middleware';

import { Context, TypedResponse } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { getTest } from './main';
import { controller } from './middlewares/controller.middleware';
import { HttpError } from './models/global/http.model';

const app = new OpenAPIHono();

export function controller2<T>(callback: () => Promise<T>): (c: Context) => Promise<Response & TypedResponse> {
  return async (c: Context): Promise<Response & TypedResponse> => {
    try {
      const data: T = await callback();
      const response = {
        message: callback.name,
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

export async function getAllTodosController({ body }: { body: any }): Promise<string> {
  // logger.info({ body });
  return 'Hello!';
}

app.openapi(route.get('/test'), controller(getTest));

export default app;
