import { Input, InputDtoObject, Output } from '@/models/common/schema.model';
import { z } from 'zod';

export const updateTodoInput = {
  params: z.object({
    todoId: z.string().openapi({ example: '1234' }),
  }),
} satisfies InputDtoObject;
export type UpdateTodoInput = Input<typeof updateTodoInput>;

export const updateTodoOutput = z.string();
export type UpdateTodoOutput = Output<typeof updateTodoOutput>;
