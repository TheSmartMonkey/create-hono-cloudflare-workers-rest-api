import { DtoObject } from '@/models/global/dto.model';
import { z } from 'zod';

export const updateTodoDto = {
  params: z
    .object({
      todoId: z.string().openapi({ example: '1234' }),
    })
    // TODO: Add to openapi schema
    .openapi('updateTodoDtoParams'),
} satisfies DtoObject;
