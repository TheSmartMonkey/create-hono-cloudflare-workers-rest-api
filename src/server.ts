import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import todoPublic from './api/todo/todo-public.routes';
import todo from './api/todo/todo.routes';
import { EnvVariables } from './helpers/env';
import { logger } from './helpers/logger';
import { errorHandler } from './middlewares/error-handler.middleware';
import { jwtMiddleware } from './middlewares/jwt.middleware';

const app = new OpenAPIHono<{ Bindings: EnvVariables }>();

// Middlewares
app.onError(errorHandler);
app.use('*', jwtMiddleware);

// Swagger
app.get('/public/api', swaggerUI({ url: '/public/api-json' }));
app.doc('/public/api-json', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
  bearerFormat: 'JWT',
});

// Public routes
app.route('/public/todo', todoPublic);

// Auth routes
app.route('/todo', todo);

logger.info('Api: http://127.0.0.1:8787');
logger.info('Swagger: http://127.0.0.1:8787/public/api');

export default app;
