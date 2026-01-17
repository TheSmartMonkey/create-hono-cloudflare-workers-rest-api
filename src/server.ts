import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from './common/logger';
import { errorHandler } from './middlewares/error-handler.middleware';
import { jwtMiddleware } from './middlewares/jwt.middleware';
import { envMiddleware } from './middlewares/validate-env.middleware';
import { EnvVariables } from './models/common/env.model';
import routes from './routes';

const app = new OpenAPIHono<{ Bindings: EnvVariables }>();

// Middlewares
app.onError(errorHandler);
app.use('*', jwtMiddleware);
app.use(envMiddleware);

// Swagger
app.openAPIRegistry.registerComponent('securitySchemes', 'AuthorizationBearer', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

app.get(
  '/public/api',
  swaggerUI({
    url: '/public/api-json',
    configUrl: '/public/api-json',
  }),
);

app.doc('/public/api-json', {
  info: {
    title: 'Hono REST API',
    version: 'v1',
  },
  openapi: '3.1.0',
  security: [
    {
      AuthorizationBearer: [],
    },
  ],
});

app.route('/', routes);

logger.info('Api: http://127.0.0.1:8787');
logger.info('Swagger: http://127.0.0.1:8787/public/api');

export default app;
