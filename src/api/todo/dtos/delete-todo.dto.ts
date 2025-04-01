import { Dto, DtoObject } from '@/models/global/dto.model';
import { z } from 'zod';

export const deleteTodoDto = {
  params: z.object({
    todoId: z.string().openapi({ example: '1234' }),
  }),
} satisfies DtoObject;

export type DeleteTodoDto = Dto<typeof deleteTodoDto>;
