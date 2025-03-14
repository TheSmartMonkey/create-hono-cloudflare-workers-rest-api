// import { OpenAPIHono } from '@hono/zod-openapi';
// import todoPublic from './api/todo/todo-public.routes';
// import { route } from './middlewares/open-api.middleware';
// // import { writeFileSync } from 'fs';
// // import { generate } from 'openapi-typescript-codegen';

import { OpenAPIHono } from '@hono/zod-openapi';
import { route } from './middlewares/open-api.middleware';

// const app = new OpenAPIHono();

// app.route('/public/todo', todoPublic);
// app.openapi(route.get('/'), (c) => {
//   return c.json({ message: 'Hello Hono!' });
// });

// Function to fetch and generate services
// async function fetchAndGenerate() {
//   try {
//     console.log('Fetching OpenAPI spec...');
//     const response = await fetch('http://localhost:8787/public/api-json');
//     const spec = await response.json(); // Get the JSON

//     console.log('Saving OpenAPI spec to swagger.json...');
//     writeFileSync('./swagger.json', JSON.stringify(spec, null, 2));

//     console.log('Generating Angular services...');
//     await generate({
//       input: './swagger.json',
//       output: './dist',
//     });

//     console.log('✅ Angular services generated successfully in ./dist');
//   } catch (error) {
//     console.error('❌ Error fetching or generating:', error);
//   }
// }

// Wait a bit before fetching to ensure the server is running
// setTimeout(fetchAndGenerate, 2000);

const app = new OpenAPIHono();

// app.route('/public/todo', todoPublic);
// app.route('/', routes);
app.openapi(route.get('/'), (c) => {
  return c.json({ message: 'Hello Hono!' });
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

const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
});

server.stop();
process.exit(0);
