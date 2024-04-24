import { logger } from '@src/helpers/logger';
import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodSchema } from 'zod';

export function dtoValidator(dto: { body?: ZodSchema; params?: ZodSchema; queryParams?: ZodSchema }, logEntrypoint = true): any {
  return async (c: Context, next: Next): Promise<any> => {
    try {
      const body = await c.req.parseBody();
      const params = c.req.param();
      const queryParams = c.req.query();
      if (logEntrypoint) {
        logger.info({ [dtoValidator.name]: { body, params, queryParams } });
      }

      // Validate data
      await Promise.all([
        validate(dto?.body as ZodSchema, body),
        validate(dto?.params as ZodSchema, params),
        validate(dto?.queryParams as ZodSchema, queryParams),
      ]).catch((err) => {
        throw err;
      });
      await next();
    } catch (error: any) {
      if (error?.success === false) {
        return c.json(error, 400);
      }
      throw new HTTPException(500, { message: 'UNKNOWN_DTO_VALIDATOR_ERROR', cause: error });
    }
  };
}

async function validate(schema: ZodSchema, data: any): Promise<void> {
  return schema?.safeParseAsync(data).then((result) => {
    if (!result?.success) {
      throw result;
    }
  });
}
