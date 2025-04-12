import { logger } from '@/common/logger';
import { HttpError, HttpOutput } from '@/models/global/http.model';
import { User } from '@/models/user.model';
import { Context, TypedResponse } from 'hono';
import { HTTPException } from 'hono/http-exception';

/**
 * @description Controller config
 * @property disableLogInput - Disable logging the input
 * @property disableLogOutput - Disable logging the output
 * @property useCustomOutput - Use custom output
 */
type ControllerConfig = {
  disableLogInput?: boolean;
  disableLogOutput?: boolean;
  useCustomOutput?: boolean;
};

/**
 * @description Controller
 * @param callback - Callback function
 * @param config - Controller config
 * @returns Controller
 */
export function controller<T>(
  callback: ({ body, params, queryParams, user }: { body: any; params: any; queryParams: any; user: User }) => Promise<T>,
  config?: ControllerConfig,
): (c: Context) => Promise<Response & TypedResponse<HttpOutput<T> | T>> {
  return async (c: Context): Promise<Response & TypedResponse<HttpOutput<T> | T>> => {
    try {
      const body = await parseBody(c);
      const params = c.req.param();
      const queryParams = c.req.query();
      const user = c.get('user');
      if (!config?.disableLogInput) {
        logger.info({ input: { body, params, queryParams } });
      }

      const data: T = await callback({ body, params, queryParams, user });
      const output: HttpOutput<T> | T = createCustomOutput(callback.name, data, config);
      if (!config?.disableLogOutput) {
        logger.info({ output });
      }
      return c.json(output as any);
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

function createCustomOutput<T>(functionName: string, data: T, config?: ControllerConfig): HttpOutput<T> | T {
  if (config?.useCustomOutput) {
    return data;
  }
  return {
    message: camelToUppercaseSnakeCase(functionName),
    data,
  };
}
