import { Input, InputDtoObject, Output } from '@/models/common/schema.model';
import { z } from 'zod';

export const getTodoByIdInput = {
  params: z.object({
    todoId: z.string().openapi({ example: '1234' }),
  }),
} satisfies InputDtoObject;
export type GetTodoByIdInput = Input<typeof getTodoByIdInput>;

export const getTodoByIdOutput = z.string();
export type GetTodoByIdOutput = Output<typeof getTodoByIdOutput>;
