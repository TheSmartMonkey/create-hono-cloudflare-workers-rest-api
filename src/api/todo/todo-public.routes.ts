import { controller } from '@/middlewares/controller.middleware';
import { route } from '@/middlewares/open-api.middleware';
import { OpenAPIHono } from '@hono/zod-openapi';
import { getAllTodosController } from './todo.contoller';

const todoPublic = new OpenAPIHono();

todoPublic.openapi(route.get('/', 'public-todo'), controller(getAllTodosController));

export default todoPublic;
