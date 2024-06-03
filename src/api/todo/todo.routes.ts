import { OpenAPIHono } from '@hono/zod-openapi';
import { controller } from '@src/middlewares/controller.middleware';
import { OpenAPIRoute } from '@src/middlewares/open-api.middleware';
import { createTodoDto } from './dtos/create-todo.dto';
import { deleteTodoDto } from './dtos/delete-todo.dto';
import { getTodoByIdDto } from './dtos/get-todo-by-id.dto';
import { updateTodoDto } from './dtos/update-todo.dto';
import {
  createTodoController,
  deleteTodoController,
  getAllUserTodosController,
  getTodoByIdController,
  updateTodoController,
} from './todo.contoller';

const todo = new OpenAPIHono();

todo.openapi(OpenAPIRoute.get('/user'), controller(getAllUserTodosController));
todo.openapi(OpenAPIRoute.get('/todoId/{todoId}', getTodoByIdDto), controller(getTodoByIdController));
todo.openapi(OpenAPIRoute.post('/', createTodoDto), controller(createTodoController));
todo.openapi(OpenAPIRoute.delete('/todoId/{todoId}', deleteTodoDto), controller(deleteTodoController));
todo.openapi(OpenAPIRoute.put('/todoId/{todoId}', updateTodoDto), controller(updateTodoController));

export default todo;
