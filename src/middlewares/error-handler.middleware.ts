import { logger } from '@/common/logger';
import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export function errorHandler(error: Error, c: Context): Response {
  logger.error(error as Error);

  if (error instanceof HTTPException) {
    return c.json(
      {
        message: error.message,
        status: error.status,
      },
      error.status,
    );
  }

  return c.json(
    {
      message: 'INTERNAL_SERVER_ERROR',
    },
    500,
  );
}
