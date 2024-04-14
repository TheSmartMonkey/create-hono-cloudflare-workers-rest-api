import { log } from './helpers/logger';

export function getMessage(): string {
  const message = 'Hello Hono!';
  log.info({ message });
  log.error({ message });
  return message;
}
