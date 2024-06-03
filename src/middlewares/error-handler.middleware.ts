import { logger } from '@src/helpers/logger';
import { HTTPException } from 'hono/http-exception';

// TODO: app.onError((err, c) => { return json as context
export function errorHandler(error: Error): any {
  logger.error(error);
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
}
