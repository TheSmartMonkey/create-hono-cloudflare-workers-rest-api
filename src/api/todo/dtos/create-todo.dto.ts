import { Dto, DtoObject } from '@/models/global/dto.model';
import { z } from 'zod';

export const createTodoDto = {
  body: z
    .object({
      name: z.string().openapi({ example: 'john' }),
    })
    .openapi('createTodoDtoBody'),
} satisfies DtoObject;

export type CreateTodoDto = Dto<typeof createTodoDto>;
