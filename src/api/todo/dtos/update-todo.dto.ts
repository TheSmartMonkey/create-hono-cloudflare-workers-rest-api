import { EnvVariables } from '@src/helpers/env';
import { User } from '@src/models/user.model';
import { z } from 'zod';

export const updateTodoDto = {
  body: z.object({}),
  params: z.object({
    todoId: z.string().openapi({ example: '1234' }),
  }).openapi('updateTodoDtoParams'),
  queryParams: z.object({}),
};

export type UpdateTodo = {
  body: z.infer<typeof updateTodoDto.body>;
  params: z.infer<typeof updateTodoDto.params>;
  queryParams: z.infer<typeof updateTodoDto.queryParams>;
  user: User;
  env: EnvVariables;
};
