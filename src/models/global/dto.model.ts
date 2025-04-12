import { User } from '@/models/user.model';
import { z } from 'zod';

// TODO: InputSchemaObject
export type DtoObject = {
  body?: z.ZodType;
  params?: z.ZodType;
  queryParams?: z.ZodType;
};

// TODO: InputSchema
export type DtoSchema = {
  body?: z.ZodSchema;
  params?: z.ZodSchema;
  queryParams?: z.ZodSchema;
};

// TODO: InputSchema
export type Dto<T extends DtoObject> = {
  body: z.infer<NonNullable<T['body']>>;
  params: z.infer<NonNullable<T['params']>>;
  queryParams: z.infer<NonNullable<T['queryParams']>>;
  user: User;
};

// TODO: OutputSchema use for custom output
export type OutputSchema = {
  data: any;
};
