import { controller } from '@src/middlewares/controller.middleware';
import { Hono } from 'hono';
import { createTodo } from './todo.contoller';

const todo = new Hono();

todo.get('/', (c) => c.text('List Todos'));
todo.get('/todoId/:todoId', (c) => {
  const todoId = c.req.param('todoId');
  return c.text('Get Todo: ' + todoId);
});
todo.post('/', controller(createTodo));
todo.delete('/todoId/:todoId', (c) => c.text('Delete Todo'));
todo.put('/todoId/:todoId', (c) => c.text('Update Todo'));

export default todo;
