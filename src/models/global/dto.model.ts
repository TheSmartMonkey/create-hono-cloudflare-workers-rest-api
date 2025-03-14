import { z } from 'zod';
import { User } from '../user.model';

export type DtoObject = {
  body?: z.ZodType;
  params?: z.ZodType;
  queryParams?: z.ZodType;
};

export type DtoSchema = {
  body?: z.ZodSchema;
  params?: z.ZodSchema;
  queryParams?: z.ZodSchema;
};

export type Dto<T extends DtoObject> = {
  body: z.infer<NonNullable<T['body']>>;
  params: z.infer<NonNullable<T['params']>>;
  queryParams: z.infer<NonNullable<T['queryParams']>>;
  user: User;
};
