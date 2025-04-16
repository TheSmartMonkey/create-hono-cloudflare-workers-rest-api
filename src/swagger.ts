import { OpenAPIHono } from '@hono/zod-openapi';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { logger } from './common/logger';
import routes from './routes';

const app = new OpenAPIHono();

app.route('/', routes);

const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

async function fetchAndGenerate(): Promise<void> {
  try {
    logger.info('Fetching OpenAPI spec...');
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

    logger.info('Saving OpenAPI spec to swagger.json...');
    writeFileSync('./swagger.json', JSON.stringify(swaggerJson, null, 2));

    logger.info('Generating Angular services...');
    execSync('npx @openapitools/openapi-generator-cli generate --generator-key v3.0');
    logger.info('✅ Angular services generated successfully in ./dist');
  } catch (error) {
    logger.error('❌ Error fetching or generating:');
    logger.error(error as Error);
  }
}

fetchAndGenerate().then(() => {
  server.stop();
  process.exit(0);
});
