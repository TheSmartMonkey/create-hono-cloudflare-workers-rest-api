import pino from 'pino';

export const log = pino({ level: 'info' });

// Redefined console.log for external libs that have
// the bad idea to use it
// eslint-disable-next-line no-console
console.log = (...args): void => log.debug({ src: 'console.log', args });
