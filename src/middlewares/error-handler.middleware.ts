import { logger } from '@/common/logger';
import { ErrorOutput } from '@/models/global/error.model';
import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export function errorHandler(error: Error, c: Context): Response {
  logger.error(error as Error);

  if (error instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: {
          name: error.message,
        },
      } satisfies ErrorOutput,
      error.status,
    );
  }

  return c.json(
    {
      success: false,
      error: {
        name: 'INTERNAL_SERVER_ERROR',
      },
    } satisfies ErrorOutput,
    500,
  );
}
