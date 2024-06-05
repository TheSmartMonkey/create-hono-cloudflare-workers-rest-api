import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
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
app.doc('/public/api-json', {});
app.get(
  '/public/api',
  apiReference({
    pageTitle: 'Create Hono Cloudflare Workers REST API',
    hideDownloadButton: true,
    authentication: {
      http: {
        basic: { username: '', password: '' },
        bearer: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Fzyj62HwBhH2bNZkd9x1fd2s8TIuzUO8JmDMLAcPALY' },
      },
    },
    spec: {
      url: '/public/api-json',
    },
  }),
);

// Public routes
app.route('/public/todo', todoPublic);

// Auth routes
app.route('/todo', todo);

logger.info('Api: http://127.0.0.1:8787');
logger.info('Swagger: http://127.0.0.1:8787/public/api');

export default app;
