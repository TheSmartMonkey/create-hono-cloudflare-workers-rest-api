import { logger } from '@/common/logger';
import { HttpError, UnauthorizedError } from '@/models/global/http.model';
import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'hono/jwt';

export async function jwtMiddleware(c: Context, next: Next): Promise<any> {
  try {
    if (c?.req?.url.includes('public')) return next();
    const authHeader = c.req.header('authorization');
    if (!authHeader) throw new UnauthorizedError('TOKEN_IS_UNDEFINED');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedError('TOKEN_IS_UNDEFINED');

    const jwtSecret = c.env.JWT_SECRET;
    const user = await verify(token, jwtSecret);
    c.set('user', user);
    logger.info({ user });
    return next();
  } catch (error: any) {
    if (error instanceof HttpError) {
      throw new HTTPException(error?.status, { message: error?.message, cause: error });
    }
    throw new HTTPException(403, { message: 'REQUIRE_AUTH_TOKEN_ERROR', cause: error });
  }
}
