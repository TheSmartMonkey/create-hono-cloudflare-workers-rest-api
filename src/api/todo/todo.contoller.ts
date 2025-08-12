import { getEnv } from '@/common/env';
import { logger } from '@/common/logger';
import { BadRequestError } from '@/models/common/error.model';
import { User } from '@/models/user.model';
import { deleteTodo, getAllTodos, getAllUserTodos, getTodoById, updateTodo } from '@/services/todo.service';
import { sign } from 'hono/jwt';
import { CreateTodoInput, CreateTodoOutput } from './schemas/create-todo.schema';
import { DeleteTodoInput, DeleteTodoOutput } from './schemas/delete-todo.schema';
import { GetTodoByIdInput, GetTodoByIdOutput } from './schemas/get-todo-by-id.schema';
import { UpdateTodoInput, UpdateTodoOutput } from './schemas/update-todo.schema';

export async function createTodoController(input: CreateTodoInput): Promise<CreateTodoOutput> {
  const { body } = input;
  logger.info({ body });
  if (Object.keys(body).length === 0) {
    throw new BadRequestError('BODY_NOT_PROVIDED');
  }
  return body;
}

export async function getAllTodosController(input: any): Promise<string> {
  const { body } = input;
  const env = getEnv();
  logger.info({ env, body });
  const token = await sign({}, env.JWT_SECRET);
  logger.info(token);
  return getAllTodos();
}

export async function getAllUserTodosController(input: { user: User }): Promise<string> {
  const { user } = input;
  return getAllUserTodos(user.userId);
}

export async function getTodoByIdController(input: GetTodoByIdInput): Promise<GetTodoByIdOutput> {
  const { params, user } = input;
  logger.info({ user });
  return getTodoById(params.todoId);
}

export async function deleteTodoController(input: DeleteTodoInput): Promise<DeleteTodoOutput> {
  const { params } = input;
  const data = await deleteTodo(params.todoId);
  return {
    customMessage: 'DELETE_TODO_SUCCESS',
    data,
  };
}

export async function updateTodoController(input: UpdateTodoInput): Promise<UpdateTodoOutput> {
  const { params } = input;
  return updateTodo(params.todoId);
}
