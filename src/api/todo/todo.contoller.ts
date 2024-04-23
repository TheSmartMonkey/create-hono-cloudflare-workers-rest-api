import { logger } from '@src/helpers/logger';
import { HttpError } from '@src/models/global/http.model';
import { Context, Env } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { BlankInput } from 'hono/types';

export async function createTodo(c: Context<Env, '/', BlankInput>): Promise<any> {
  try {
    const body = await c.req.parseBody();
    if (Object.keys(body).length === 0) {
      // throw new Error('CREATE_TODO_ERROR');
      throw new HttpError(401, 'CREATE_TODO_ERROR');
    }
    logger.info({ body });
    return body;
  } catch (error) {
    if (error instanceof HttpError) {
      throw new HTTPException(error?.status, { message: error?.message, cause: error });
    }
    throw new HTTPException(500, { message: 'UNKNOWN_ERROR', cause: error });
  }
}
