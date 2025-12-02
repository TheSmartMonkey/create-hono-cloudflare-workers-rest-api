import { HttpErrorDescription, HttpErrorStatusCode } from '@/models/common/error.model';
import { InputDto } from '@/models/common/schema.model';
import { HttpSuccessDescription, HttpSuccessStatusCode } from '@/models/common/success.model';
import { z } from 'zod';

type RouteResponse = {
  description: HttpSuccessDescription | HttpErrorDescription;
  content: {
    'application/json': {
      schema: z.ZodType;
    };
  };
};

type RouteConfig = {
  method: 'get' | 'post' | 'delete' | 'put';
  path: string;
  request?: {
    body?: { content: { 'application/json': { schema: InputDto['body'] } } };
    params?: InputDto['params'];
    query?: InputDto['queryParams'];
  };
  responses: {
    [key in HttpSuccessStatusCode | HttpErrorStatusCode]: RouteResponse;
  };
  tags?: string[];
};

type RouteValidation = {
  input?: InputDto;
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
  const routeConfig: RouteConfig = {
    method,
    path,
    responses: {
      200: createSucessOutput('OK_SUCCESS', output),
      400: createErrorOutput('BAD_REQUEST_ERROR'),
      401: createErrorOutput('UNAUTHORIZED_ERROR'),
      403: createErrorOutput('FORBIDDEN_ERROR'),
      404: createErrorOutput('NOT_FOUND_ERROR'),
      409: createErrorOutput('CONFLICT_ERROR'),
      500: createErrorOutput('INTERNAL_SERVER_ERROR'),
    },
  };

  if (input) {
    routeConfig.request = createInputSchema(input);
  }

  routeConfig.tags = [serviceName];

  return routeConfig;
}

function createInputSchema(dto: InputDto): RouteConfig['request'] {
  if (dto.body) {
    const body = { content: { 'application/json': { schema: dto?.body } } };
    return { body, params: dto.params, query: dto.queryParams };
  }
  return { params: dto.params, query: dto.queryParams };
}

function createSucessOutput(description: HttpSuccessDescription, output?: z.ZodType): RouteResponse {
  const defaultSuccessOutputSchema = z.object({
    success: z.boolean(),
    data: z.object({}).passthrough(),
  });

  const schema = output
    ? z.object({
        success: z.boolean(),
        data: output,
      })
    : defaultSuccessOutputSchema;

  return {
    description,
    content: { 'application/json': { schema } },
  };
}

function createErrorOutput(description: HttpErrorDescription): RouteResponse {
  const defaultErrorOutputSchema = z.object({
    success: z.boolean().default(false),
    error: z.object({
      issues: z.array(z.string()),
      name: z.string(),
    }),
  });
  return {
    description,
    content: { 'application/json': { schema: defaultErrorOutputSchema } },
  };
}
