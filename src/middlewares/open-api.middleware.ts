import { DtoSchema } from '@/models/global/dto.model';

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
          schema: {
            type: 'object';
            properties: {
              message: { type: 'string' };
              data: { type: 'object' };
            };
          };
        };
      };
    };
    201: {
      description: 'CREATE_SUCCESS';
      content: {
        'application/json': {
          schema: {
            type: 'object';
            properties: {
              message: { type: 'string' };
              data: { type: 'object' };
            };
          };
        };
      };
    };
  };
};

export const route = {
  get: (path: string, dto?: DtoSchema): any => createRoute('get', path, dto),
  post: (path: string, dto?: DtoSchema): any => createRoute('post', path, dto),
  delete: (path: string, dto?: DtoSchema): any => createRoute('delete', path, dto),
  put: (path: string, dto?: DtoSchema): any => createRoute('put', path, dto),
} as const;

function createRoute(method: RouteConfig['method'], path: string, dto?: DtoSchema): RouteConfig {
  const routeConfig: RouteConfig = {
    method,
    path,
    responses: {
      200: {
        description: 'OK_SUCCESS',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                data: { type: 'object' }
              }
            }
          }
        }
      },
      201: {
        description: 'CREATE_SUCCESS',
        content: {
          'application/json': {
            schema: {
              type: 'object', 
              properties: {
                message: { type: 'string' },
                data: { type: 'object' }
              }
            }
          }
        }
      }
    }
  };

  if (dto) {
    routeConfig.request = createDto(dto);
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
