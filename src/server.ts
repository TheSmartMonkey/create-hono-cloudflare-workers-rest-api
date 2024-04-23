import { Hono } from 'hono';
import todo from './api/todo/todo.routes';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = new Hono();

// Middlewares
app.onError(errorHandler);

// Routes
app.route('/todo', todo);

export default app;
