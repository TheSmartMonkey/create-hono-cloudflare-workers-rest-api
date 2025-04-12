import { Input, InputSchemaObject, Output } from '@/models/global/schema.model';
import { z } from 'zod';

export const createTodoInput = {
  body: z
    .object({
      name: z.string().openapi({ example: 'john' }),
    })
    .openapi('createTodoInputBody'),
} satisfies InputSchemaObject;
export type CreateTodoInput = Input<typeof createTodoInput>;

export const createTodoOutput = z.object({
  name: z.string(),
});
export type CreateTodoOutput = Output<typeof createTodoOutput>;
