import { OpenAPIHono } from '@hono/zod-openapi';
import todoPublic from './api/todo/todo-public.routes';
import todo from './api/todo/todo.routes';

const app = new OpenAPIHono();

// Public routes
app.route('/public/todo', todoPublic);

// Auth routes
app.route('/todo', todo);

export default app;
