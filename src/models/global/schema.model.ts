import { User } from '@/models/user.model';
import { z } from 'zod';

export type InputSchemaObject = {
  body?: z.ZodType;
  params?: z.ZodType;
  queryParams?: z.ZodType;
};

export type InputSchema = {
  body?: z.ZodSchema;
  params?: z.ZodSchema;
  queryParams?: z.ZodSchema;
};

export type Input<T extends InputSchemaObject> = {
  body: z.infer<NonNullable<T['body']>>;
  params: z.infer<NonNullable<T['params']>>;
  queryParams: z.infer<NonNullable<T['queryParams']>>;
  user: User;
};

export type Output<T extends z.ZodType> = z.infer<T>;
