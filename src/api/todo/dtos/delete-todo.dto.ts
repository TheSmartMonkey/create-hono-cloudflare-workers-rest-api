import { z } from 'zod';

export const deleteTodoDto = {
  body: z.object({}),
  params: z.object({
    todoId: z.string(),
  }),
  queryParams: z.object({}),
};

export type DeleteTodo = {
  body: z.infer<typeof deleteTodoDto.body>;
  params: z.infer<typeof deleteTodoDto.params>;
  queryParams: z.infer<typeof deleteTodoDto.queryParams>;
};
