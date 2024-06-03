import { EnvVariables } from '@src/helpers/env';
import { User } from '@src/models/user.model';
import { z } from 'zod';

export const getTodoByIdDto = {
  body: z.object({}),
  params: z.object({
    todoId: z.string().openapi({ example: '1234' }),
  }).openapi('getTodoByIdDtoParams'),
  queryParams: z.object({}),
};

export type GetTodoById = {
  body: z.infer<typeof getTodoByIdDto.body>;
  params: z.infer<typeof getTodoByIdDto.params>;
  queryParams: z.infer<typeof getTodoByIdDto.queryParams>;
  user: User;
  env: EnvVariables;
};
