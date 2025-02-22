import { DtoSchema } from '@/models/global/dto.model';

type RouteConfig = {
  method: 'get' | 'post' | 'delete' | 'put';
  path: string;
  request?: {
    body?: {
      content: {
        'application/json': { schema: DtoSchema['body'] };
      };
    };
    params?: DtoSchema['params'];
    query?: DtoSchema['queryParams'];
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
  static get(path: string, dto?: DtoSchema): any {
    return OpenAPIRoute.createRoute('get', path, dto);
  }

  static post(path: string, dto?: DtoSchema): any {
    return OpenAPIRoute.createRoute('post', path, dto);
  }

  static delete(path: string, dto?: DtoSchema): any {
    return OpenAPIRoute.createRoute('delete', path, dto);
  }

  static put(path: string, dto?: DtoSchema): any {
    return OpenAPIRoute.createRoute('put', path, dto);
  }

  static createRoute(method: RouteConfig['method'], path: string, dto?: DtoSchema): RouteConfig {
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

  static createDto(dto: DtoSchema): RouteConfig['request'] {
    if (dto.body) {
      const body = {
        content: {
          'application/json': { schema: dto?.body },
        },
      };
      return {
        body,
        params: dto.params,
        query: dto.queryParams,
      };
    }
    return {
      params: dto.params,
      query: dto.queryParams,
    };
  }
}
