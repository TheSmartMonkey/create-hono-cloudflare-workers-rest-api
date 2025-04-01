import pino from 'pino';

let instance: pino.Logger | null = null;

function getInstance(): pino.Logger {
  if (!instance) {
    instance = pino({ level: 'info' });
  }
  return instance;
}

export function info(message: string | object): void {
  getInstance().info(message);
}

export function error(message: string, ...args: any[]): void {
  getInstance().error({ args }, message);
}

export const logger = {
  info,
  error,
};
