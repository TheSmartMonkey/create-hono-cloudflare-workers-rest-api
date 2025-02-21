import { EnvVariables } from '@src/helpers/env';
import { User } from '@src/models/user.model';
import { z } from 'zod';

export const updateTodoDto = {
  params: z
    .object({
      todoId: z.string().openapi({ example: '1234' }),
    })
    .openapi('updateTodoDtoParams'),
};

export type UpdateTodo = {
  params: z.infer<typeof updateTodoDto.params>;
  user: User;
  env: EnvVariables;
};
