import { InputSchema } from '@/models/global/schema.model';
import { z } from 'zod';

type RouteConfig = {
  method: 'get' | 'post' | 'delete' | 'put';
  path: string;
  request?: {
    body?: { content: { 'application/json': { schema: InputSchema['body'] } } };
    params?: InputSchema['params'];
    query?: InputSchema['queryParams'];
  };
  responses: {
    200: {
      description: 'OK_SUCCESS';
      content: {
        'application/json': {
          schema: z.ZodType;
        };
      };
    };
  };
  tags?: string[];
};

type RouteValidation = {
  input?: InputSchema;
  output?: z.ZodType;
};

export const route = {
  get: (path: string, serviceName: Lowercase<string>, { input, output }: RouteValidation = {}): any =>
    createRoute('get', path, serviceName, { input, output }),
  post: (path: string, serviceName: Lowercase<string>, { input, output }: RouteValidation = {}): any =>
    createRoute('post', path, serviceName, { input, output }),
  delete: (path: string, serviceName: Lowercase<string>, { input, output }: RouteValidation = {}): any =>
    createRoute('delete', path, serviceName, { input, output }),
  put: (path: string, serviceName: Lowercase<string>, { input, output }: RouteValidation = {}): any =>
    createRoute('put', path, serviceName, { input, output }),
} as const;

function createRoute(
  method: RouteConfig['method'],
  path: string,
  serviceName: Lowercase<string>,
  { input, output }: RouteValidation,
): RouteConfig {
  const defaultOutputSchema = z.object({
    message: z.string(),
    data: z.object({}).passthrough(),
  });
  const routeConfig: RouteConfig = {
    method,
    path,
    responses: {
      200: {
        description: 'OK_SUCCESS',
        content: {
          'application/json': {
            schema: output || defaultOutputSchema,
          },
        },
      },
    },
  };

  if (input) {
    routeConfig.request = createInputSchema(input);
  }

  routeConfig.tags = [serviceName];

  return routeConfig;
}

function createInputSchema(dto: InputSchema): RouteConfig['request'] {
  if (dto.body) {
    const body = { content: { 'application/json': { schema: dto?.body } } };
    return { body, params: dto.params, query: dto.queryParams };
  }
  return { params: dto.params, query: dto.queryParams };
}
