import { EnvVariables } from '@src/helpers/env';
import { logger } from '@src/helpers/logger';
import { HttpError } from '@src/models/global/http.model';
import { User } from '@src/models/user.model';
import { deleteTodo, getAllTodos, getAllUserTodos, getTodoById, updateTodo } from '@src/services/todo.service';
import { CreateTodo } from './dtos/create-todo.dto';
import { DeleteTodo } from './dtos/delete-todo.dto';
import { GetTodoById } from './dtos/get-todo-by-id.dto';
import { UpdateTodo } from './dtos/update-todo.dto';

export async function createTodoController({ body }: CreateTodo): Promise<CreateTodo['body']> {
  // Just to test error middleware
  logger.info({ body });
  if (Object.keys(body).length === 0) {
    // throw new Error('BODY_NOT_PROVIDED_ERROR');
    throw new HttpError(400, 'BODY_NOT_PROVIDED_ERROR');
  }
  return body;
}

export async function getAllTodosController({ env }: { env: EnvVariables }): Promise<string> {
  logger.info({ env });
  return getAllTodos();
}

export async function getAllUserTodosController({ user }: { user: User }): Promise<string> {
  return getAllUserTodos(user.userId);
}

export async function getTodoByIdController({ params, user }: GetTodoById): Promise<string> {
  logger.info({ user });
  return getTodoById(params.todoId);
}

export async function deleteTodoController({ params }: DeleteTodo): Promise<string> {
  return deleteTodo(params.todoId);
}

export async function updateTodoController({ params }: UpdateTodo): Promise<string> {
  return updateTodo(params.todoId);
}
