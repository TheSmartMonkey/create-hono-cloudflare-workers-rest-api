import pino from 'pino';

let instance: pino.Logger | null = null;

function getInstance(): pino.Logger {
  if (!instance) {
    instance = pino({ level: 'info' });
  }
  return instance;
}

function info(message: string | object): void {
  getInstance().info(message);
}

function error(message: string | object | Error): void {
  getInstance().error(message);
}

export const logger = {
  info,
  error,
};
