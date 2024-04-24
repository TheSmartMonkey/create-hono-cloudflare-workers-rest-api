import { logger } from '@src/helpers/logger';
import { HttpError } from '@src/models/global/http.model';
import { deleteTodo, getAllTodos, getTodoById, updateTodo } from '@src/services/todo.service';
import { CreateTodo } from './dtos/create-todo.dto';
import { DeleteTodo } from './dtos/delete-todo.dto';
import { GetTodoById } from './dtos/get-todo-by-id.dto';
import { UpdateTodo } from './dtos/update-todo.dto';

export async function createTodoController({ body }: CreateTodo): Promise<any> {
  // Just to test error middleware
  logger.info({ body });
  if (Object.keys(body).length === 0) {
    // throw new Error('BODY_NOT_PROVIDED_ERROR');
    throw new HttpError(400, 'BODY_NOT_PROVIDED_ERROR');
  }
  return body;
}

export async function getAllTodosController(): Promise<any> {
  return getAllTodos();
}

export async function getTodoByIdController({ params }: GetTodoById): Promise<any> {
  return getTodoById(params.todoId);
}

export async function deleteTodoController({ params }: DeleteTodo): Promise<any> {
  return deleteTodo(params.todoId);
}

export async function updateTodoController({ params }: UpdateTodo): Promise<any> {
  return updateTodo(params.todoId);
}
