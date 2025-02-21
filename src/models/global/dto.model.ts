import { z } from 'zod';

export type DtoSchema = {
  body?: z.ZodSchema;
  params?: z.ZodSchema;
  queryParams?: z.ZodSchema;
};
