import { Hono } from 'hono';
import todo from './api/todo/todo.routes';

const app = new Hono();

// Routes
app.route('/todo', todo);

export default app;
