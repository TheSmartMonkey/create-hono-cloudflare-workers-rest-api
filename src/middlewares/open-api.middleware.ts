import { DtoSchema } from '@/models/global/dto.model';
import { z } from 'zod';

type RouteConfig = {
  method: 'get' | 'post' | 'delete' | 'put';
  path: string;
  request?: {
    body?: { content: { 'application/json': { schema: DtoSchema['body'] } } };
    params?: DtoSchema['params'];
    query?: DtoSchema['queryParams'];
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
    201: {
      description: 'CREATE_SUCCESS';
      content: {
        'application/json': {
          schema: z.ZodType;
        };
      };
    };
  };
};

type RouteValidation = {
  input?: DtoSchema;
  output?: z.ZodType;
};

export const route = {
  get: (path: string, { input, output }: RouteValidation = {}): any => createRoute('get', path, { input, output }),
  post: (path: string, { input, output }: RouteValidation = {}): any => createRoute('post', path, { input, output }),
  delete: (path: string, { input, output }: RouteValidation = {}): any => createRoute('delete', path, { input, output }),
  put: (path: string, { input, output }: RouteValidation = {}): any => createRoute('put', path, { input, output }),
} as const;

function createRoute(method: RouteConfig['method'], path: string, { input, output }: RouteValidation): RouteConfig {
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
      201: {
        description: 'CREATE_SUCCESS',
        content: {
          'application/json': {
            schema: output || defaultOutputSchema,
          },
        },
      },
    },
  };

  if (input) {
    routeConfig.request = createDto(input);
  }

  return routeConfig;
}

function createDto(dto: DtoSchema): RouteConfig['request'] {
  if (dto.body) {
    const body = { content: { 'application/json': { schema: dto?.body } } };
    return { body, params: dto.params, query: dto.queryParams };
  }
  return { params: dto.params, query: dto.queryParams };
}
