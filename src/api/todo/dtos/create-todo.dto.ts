import { EnvVariables } from '@src/helpers/env';
import { User } from '@src/models/user.model';
import { z } from 'zod';

export const createTodoDto = {
  body: z
    .object({
      name: z.string().openapi({ example: 'john' }),
    })
    .openapi('createTodoDtoBody'),
};

export type CreateTodoDto = {
  body: z.infer<typeof createTodoDto.body>;
  user: User;
  env: EnvVariables;
};
