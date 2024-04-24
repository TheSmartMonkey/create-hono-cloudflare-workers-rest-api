import { logger } from '@src/helpers/logger';
import { HttpError } from '@src/models/global/http.model';
import { CreateTodo } from './dtos/create-todo.dto';

export async function createTodo({ body }: CreateTodo): Promise<any> {
  // Just to test error middleware
  logger.info({ body });
  if (Object.keys(body).length === 0) {
    // throw new Error('BODY_NOT_PROVIDED_ERROR');
    throw new HttpError(400, 'BODY_NOT_PROVIDED_ERROR');
  }
  return body;
}
