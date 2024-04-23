import { logger } from '@src/helpers/logger';
import { HTTPException } from 'hono/http-exception';

export function errorHandler(error: Error): any {
  logger.error(error);
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
}
