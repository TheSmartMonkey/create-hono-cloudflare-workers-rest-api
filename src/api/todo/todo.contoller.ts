import { getEnv } from '@/common/env';
import { logger } from '@/common/logger';
import { HttpError } from '@/models/global/http.model';
import { User } from '@/models/user.model';
import { deleteTodo, getAllTodos, getAllUserTodos, getTodoById, updateTodo } from '@/services/todo.service';
import { sign } from 'hono/jwt';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { DeleteTodoDto } from './dtos/delete-todo.dto';
import { GetTodoByIdDto, GetTodoByIdOutput } from './dtos/get-todo-by-id.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

export async function createTodoController({ body }: CreateTodoDto): Promise<CreateTodoDto['body']> {
  // Just to test error middleware
  logger.info({ body });
  if (Object.keys(body).length === 0) {
    // throw new Error('BODY_NOT_PROVIDED_ERROR');
    throw new HttpError(400, 'BODY_NOT_PROVIDED_ERROR');
  }
  return body;
}

export async function getAllTodosController({ body }: { body: any }): Promise<string> {
  const env = getEnv();
  logger.info({ env, body });
  const token = await sign({}, env.JWT_SECRET);
  logger.info(token);
  return getAllTodos();
}

export async function getAllUserTodosController({ user }: { user: User }): Promise<string> {
  return getAllUserTodos(user.userId);
}

export async function getTodoByIdController({ params, user }: GetTodoByIdDto): Promise<GetTodoByIdOutput> {
  logger.info({ user });
  const todo = await getTodoById(params.todoId);
  return {
    todoId: todo,
    title: 'fakeTitle',
  };
}

export async function deleteTodoController({ params }: DeleteTodoDto): Promise<string> {
  return deleteTodo(params.todoId);
}

export async function updateTodoController({ params }: UpdateTodoDto): Promise<string> {
  return updateTodo(params.todoId);
}
