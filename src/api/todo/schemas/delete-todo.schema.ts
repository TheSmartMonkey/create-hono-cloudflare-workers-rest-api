import { Input, InputSchemaObject, Output } from '@/models/global/schema.model';
import { z } from 'zod';

export const deleteTodoInput = {
  params: z.object({
    todoId: z.string().openapi({ example: '1234' }),
  }),
} satisfies InputSchemaObject;
export type DeleteTodoInput = Input<typeof deleteTodoInput>;

export const deleteTodoOutput = z.object({
  customMessage: z.string(),
  data: z.string(),
});
export type DeleteTodoOutput = Output<typeof deleteTodoOutput>;
