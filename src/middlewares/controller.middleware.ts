import { logger } from '@/common/logger';
import { HttpError } from '@/models/global/http.model';
import { User } from '@/models/user.model';
import { Context } from 'hono';
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
): (c: Context) => Promise<Response> {
  return async (c: Context): Promise<Response> => {
    try {
      const body = await parseBody(c);
      const params = c.req.param();
      const queryParams = c.req.query();
      const user = c.get('user');
      if (!config?.disableLogInput) {
        logger.info({ input: { body, params, queryParams } });
      }

      const output: T = await callback({ body, params, queryParams, user });
      if (!config?.disableLogOutput) {
        logger.info({ output });
      }
      if (config?.useCustomOutput) {
        return c.json(output as Response);
      }
      return c.json({ data: output });
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HTTPException(error?.status, { message: error?.message, cause: error });
      }
      throw new HTTPException(500, { message: 'UNKNOWN_ERROR', cause: error });
    }
  };
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
