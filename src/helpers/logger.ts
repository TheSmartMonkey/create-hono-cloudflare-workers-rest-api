import pino from 'pino';

export const logger = pino({ level: 'info' });

// Redefined console.log for external libs that have
// the bad idea to use it
// eslint-disable-next-line no-console
console.log = (...args): void => logger.debug({ src: 'console.log', args });
