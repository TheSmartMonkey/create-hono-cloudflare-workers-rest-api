import { Hono } from 'hono';

const todo = new Hono();

todo.get('/', (c) => c.text('List Todos'));
todo.get('/todoId/:todoId', (c) => {
  const todoId = c.req.param('todoId');
  return c.text('Get Todo: ' + todoId);
});
todo.post('/', (c) => c.text('Create Todo'));
todo.delete('/todoId/:todoId', (c) => c.text('Delete Todo'));
todo.put('/todoId/:todoId', (c) => c.text('Update Todo'));

export default todo;
