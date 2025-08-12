import { logger } from '@/common/logger';
import { HttpError } from '@/models/common/error.model';
import { Input, InputSchemaObject } from '@/models/common/schema.model';
import { SuccessOutput } from '@/models/common/success.model';
import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { JSONValue } from 'hono/utils/types';

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
export function controller<TOUTPUT extends JSONValue>(
  callback: <TINPUT extends InputSchemaObject>(input: Input<TINPUT>) => Promise<TOUTPUT>,
  config?: ControllerConfig,
): (c: Context) => Promise<Response> {
  return async (c: Context): Promise<Response> => {
    try {
      const method = c.req.method;
      const path = c.req.path;
      const body = await parseBody(c);
      const params = c.req.param();
      const queryParams = c.req.query();
      const user = c.get('user');
      if (!config?.disableLogInput) {
        logger.info({ method, path, input: { body, params, queryParams } });
      }

      const output: TOUTPUT = await callback({ body, params, queryParams, user });
      if (!config?.disableLogOutput) {
        logger.info({ method, path, output });
      }
      if (config?.useCustomOutput) {
        return c.json(output);
      }
      return c.json({ success: true, data: output } satisfies SuccessOutput<TOUTPUT>);
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
