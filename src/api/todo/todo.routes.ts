import { controller } from '@/middlewares/controller.middleware';
import { route } from '@/middlewares/open-api.middleware';
import { OpenAPIHono } from '@hono/zod-openapi';
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

todo.openapi(route.get('/user'), controller(getAllUserTodosController));
todo.openapi(route.get('/todoId/{todoId}', getTodoByIdDto), controller(getTodoByIdController));
todo.openapi(route.post('/', createTodoDto), controller(createTodoController));
todo.openapi(route.delete('/todoId/{todoId}', deleteTodoDto), controller(deleteTodoController));
todo.openapi(route.put('/todoId/{todoId}', updateTodoDto), controller(updateTodoController));

export default todo;
