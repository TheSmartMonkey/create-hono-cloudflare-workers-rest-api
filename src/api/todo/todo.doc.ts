import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

const todoDoc = new OpenAPIHono();

todoDoc.openapi(
  createRoute({
    method: 'get',
    path: '/hello',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      message: 'hello',
    });
  },
);

export default todoDoc;
