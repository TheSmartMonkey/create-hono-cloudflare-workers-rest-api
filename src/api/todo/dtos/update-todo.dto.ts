import { z } from 'zod';

export const updateTodoDto = {
  body: z.object({}),
  params: z.object({
    todoId: z.string(),
  }),
  queryParams: z.object({}),
};

export type UpdateTodo = {
  body: z.infer<typeof updateTodoDto.body>;
  params: z.infer<typeof updateTodoDto.params>;
  queryParams: z.infer<typeof updateTodoDto.queryParams>;
};
