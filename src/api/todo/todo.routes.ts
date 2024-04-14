import { Hono } from 'hono';

const todo = new Hono();

todo.get('/', (c) => c.text('List Books')); // GET /book
todo.get('/:id', (c) => {
  // GET /book/:id
  const id = c.req.param('id');
  return c.text('Get Book: ' + id);
});
todo.post('/', (c) => c.text('Create Book')); // POST /book

export default todo;
