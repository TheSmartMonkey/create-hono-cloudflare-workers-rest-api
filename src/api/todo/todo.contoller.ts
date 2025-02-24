import { EnvVariables } from '@/helpers/env';
import { logger } from '@/helpers/logger';
import { HttpError } from '@/models/global/http.model';
import { User } from '@/models/user.model';
import { deleteTodo, getAllTodos, getAllUserTodos, getTodoById, updateTodo } from '@/services/todo.service';
import { sign } from 'hono/jwt';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { DeleteTodoDto } from './dtos/delete-todo.dto';
import { GetTodoByIdDto } from './dtos/get-todo-by-id.dto';
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

export async function getAllTodosController({ env, body }: { env: EnvVariables; body: any }): Promise<string> {
  logger.info({ env, body });
  const token = await sign({}, '1234');
  logger.info(token);
  return getAllTodos();
}

export async function getAllUserTodosController({ user }: { user: User }): Promise<string> {
  return getAllUserTodos(user.userId);
}

export async function getTodoByIdController({ params, user }: GetTodoByIdDto): Promise<string> {
  logger.info({ user });
  return getTodoById(params.todoId);
}

export async function deleteTodoController({ params }: DeleteTodoDto): Promise<string> {
  return deleteTodo(params.todoId);
}

export async function updateTodoController({ params }: UpdateTodoDto): Promise<string> {
  return updateTodo(params.todoId);
}
