import { logger } from '@src/helpers/logger';
import { HttpError } from '@src/models/global/http.model';

export async function createTodo({ body }: { body: { name: string } }): Promise<any> {
  // Just to test error middleware
  if (Object.keys(body).length === 0) {
    // throw new Error('BODY_NOT_PROVIDED_ERROR');
    throw new HttpError(400, 'BODY_NOT_PROVIDED_ERROR');
  }
  logger.info({ body });
  return body;
}
