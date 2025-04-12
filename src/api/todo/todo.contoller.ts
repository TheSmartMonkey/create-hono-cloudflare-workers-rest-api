import { getEnv } from '@/common/env';
import { logger } from '@/common/logger';
import { HttpError } from '@/models/global/http.model';
import { User } from '@/models/user.model';
import { deleteTodo, getAllTodos, getAllUserTodos, getTodoById, updateTodo } from '@/services/todo.service';
import { sign } from 'hono/jwt';
import { CreateTodoInput, CreateTodoOutput } from './schemas/create-todo.schema';
import { DeleteTodoInput, DeleteTodoOutput } from './schemas/delete-todo.schema';
import { GetTodoByIdInput, GetTodoByIdOutput } from './schemas/get-todo-by-id.schema';
import { UpdateTodoInput, UpdateTodoOutput } from './schemas/update-todo.schema';

export async function createTodoController({ body }: CreateTodoInput): Promise<CreateTodoOutput> {
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

export async function getTodoByIdController({ params, user }: GetTodoByIdInput): Promise<GetTodoByIdOutput> {
  logger.info({ user });
  return await getTodoById(params.todoId);
}

export async function deleteTodoController({ params }: DeleteTodoInput): Promise<DeleteTodoOutput> {
  return deleteTodo(params.todoId);
}

export async function updateTodoController({ params }: UpdateTodoInput): Promise<UpdateTodoOutput> {
  return updateTodo(params.todoId);
}
