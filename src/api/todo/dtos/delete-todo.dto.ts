import { EnvVariables } from '@/helpers/env';
import { User } from '@/models/user.model';
import { z } from 'zod';

export const deleteTodoDto = {
  params: z
    .object({
      todoId: z.string().openapi({ example: '1234' }),
    })
    .openapi('deleteTodoDtoParams'),
};

export type DeleteTodoDto = {
  params: z.infer<typeof deleteTodoDto.params>;
  user: User;
  env: EnvVariables;
};
