import { Dto, DtoObject } from '@/models/global/dto.model';
import { z } from 'zod';

export const getTodoByIdDto = {
  params: z.object({
    todoId: z.string().openapi({ example: '1234' }),
  }),
} satisfies DtoObject;

export type GetTodoByIdDto = Dto<typeof getTodoByIdDto>;
