import { Context, Next } from 'hono';
import { jwt } from 'hono/jwt';

export function jwtMiddleware(c: Context, next: Next): any {
  if (c?.req?.url.includes('public')) return next();
  const jwtMiddleware = jwt({ secret: c.env.JWT || '1234' });
  return jwtMiddleware(c, next);
}
