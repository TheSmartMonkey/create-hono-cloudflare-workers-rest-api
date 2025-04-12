import { controller } from '@/middlewares/controller.middleware';
import { route } from '@/middlewares/open-api.middleware';
import { OpenAPIHono } from '@hono/zod-openapi';
import { createTodoInput, createTodoOutput } from './schemas/create-todo.schema';
import { deleteTodoInput, deleteTodoOutput } from './schemas/delete-todo.schema';
import { getTodoByIdInput, getTodoByIdOutput } from './schemas/get-todo-by-id.schema';
import { updateTodoInput, updateTodoOutput } from './schemas/update-todo.schema';
import {
  createTodoController,
  deleteTodoController,
  getAllUserTodosController,
  getTodoByIdController,
  updateTodoController,
} from './todo.contoller';

const todo = new OpenAPIHono();

todo.openapi(route.get('/user'), controller(getAllUserTodosController));
todo.openapi(route.get('/todoId/{todoId}', { input: getTodoByIdInput, output: getTodoByIdOutput }), controller(getTodoByIdController));
todo.openapi(route.post('/', { input: createTodoInput, output: createTodoOutput }), controller(createTodoController));
todo.openapi(route.delete('/todoId/{todoId}', { input: deleteTodoInput, output: deleteTodoOutput }), controller(deleteTodoController));
todo.openapi(route.put('/todoId/{todoId}', { input: updateTodoInput, output: updateTodoOutput }), controller(updateTodoController));

export default todo;
