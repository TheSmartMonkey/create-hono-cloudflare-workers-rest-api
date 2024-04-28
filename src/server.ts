import { Hono } from 'hono';
import todoPublic from './api/todo/todo-public.routes';
import todo from './api/todo/todo.routes';
import { EnvVariables } from './helpers/env';
import { errorHandler } from './middlewares/error-handler.middleware';
import { jwtMiddleware } from './middlewares/jwt.middleware';

const app = new Hono<{ Bindings: EnvVariables }>();

// Middlewares
app.onError(errorHandler);
app.use('*', jwtMiddleware);

// Public routes
app.route('/public/todo', todoPublic);

// Auth routes
app.route('/todo', todo);

export default app;
