import { logger } from '@src/helpers/logger';

export function createTodo(c: any): string {
  logger.info({ body: c.req.parseBody() });
  return 'CREATE_TODO';
}
