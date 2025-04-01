import { OpenAPIHono } from '@hono/zod-openapi';
import routes from './routes';

const app = new OpenAPIHono();

app.route('/', routes);

const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

const swaggerJson = app.getOpenAPIDocument({
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
console.log('Swagger JSON:', JSON.stringify(swaggerJson, null, 2));

server.stop();
process.exit(0);
