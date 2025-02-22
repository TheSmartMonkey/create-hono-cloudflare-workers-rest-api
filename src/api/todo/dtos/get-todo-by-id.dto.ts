import { EnvVariables } from '@/helpers/env';
import { User } from '@/models/user.model';
import { z } from 'zod';

export const getTodoByIdDto = {
  params: z
    .object({
      todoId: z.string().openapi({ example: '1234' }),
    })
    // TODO: Pass params schema to openapi
    .openapi('getTodoByIdDtoParams'),
};

// TODO: Use a Dto type ex: Dto<typeof getTodoByIdDto>
export type GetTodoById = {
  params: z.infer<typeof getTodoByIdDto.params>;
  user: User;
  env: EnvVariables;
};
