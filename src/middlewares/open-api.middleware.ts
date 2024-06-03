import { ZodSchema } from 'zod';

type Dto = {
  body?: ZodSchema;
  params?: ZodSchema;
  queryParams?: ZodSchema;
};

type RouteConfig = {
  method: 'get' | 'post' | 'delete' | 'put';
  path: string;
  request?: {
    body: {
      content: {
        'application/json': { schema: Dto['body'] };
      };
    };
    params: Dto['params'];
    query: Dto['queryParams'];
  };
  responses: {
    200: {
      description: 'OK_SUCCESS';
    };
    201: {
      description: 'CREATE_SUCCESS';
    };
  };
};

export class OpenAPIRoute {
  static get(path: string, dto?: Dto): any {
    return OpenAPIRoute.createRoute('get', path, dto);
  }

  static post(path: string, dto?: Dto): any {
    return OpenAPIRoute.createRoute('post', path, dto);
  }

  static delete(path: string, dto?: Dto): any {
    return OpenAPIRoute.createRoute('delete', path, dto);
  }

  static put(path: string, dto?: Dto): any {
    return OpenAPIRoute.createRoute('put', path, dto);
  }

  static createRoute(method: RouteConfig['method'], path: string, dto?: Dto): RouteConfig {
    const routeConfig: RouteConfig = {
      method,
      path,
      responses: {
        200: {
          description: 'OK_SUCCESS',
        },
        201: {
          description: 'CREATE_SUCCESS',
        },
      },
    };

    if (dto) {
      routeConfig.request = OpenAPIRoute.createDto(dto);
    }

    return routeConfig;
  }

  static createDto(dto: Dto): RouteConfig['request'] {
    return {
      body: {
        content: {
          'application/json': { schema: dto.body },
        },
      },
      params: dto.params,
      query: dto.queryParams,
    };
  }
}
