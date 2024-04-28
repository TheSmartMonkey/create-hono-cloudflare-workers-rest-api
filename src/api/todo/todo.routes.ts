import { controller } from '@src/middlewares/controller.middleware';
import { dtoValidator } from '@src/middlewares/dto-validator.middleware';
import { Hono } from 'hono';
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

const todo = new Hono();

todo.get('/user', controller(getAllUserTodosController));
todo.get('/todoId/:todoId', dtoValidator(getTodoByIdDto), controller(getTodoByIdController));
todo.post('/', dtoValidator(createTodoDto), controller(createTodoController));
todo.delete('/todoId/:todoId', dtoValidator(deleteTodoDto), controller(deleteTodoController));
todo.put('/todoId/:todoId', dtoValidator(updateTodoDto), controller(updateTodoController));

export default todo;
