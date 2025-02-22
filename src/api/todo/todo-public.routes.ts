import { controller } from '@/middlewares/controller.middleware';
import { OpenAPIRoute } from '@/middlewares/open-api.middleware';
import { OpenAPIHono } from '@hono/zod-openapi';
import { getAllTodosController } from './todo.contoller';

const todoPublic = new OpenAPIHono();

todoPublic.openapi(OpenAPIRoute.get('/'), controller(getAllTodosController));

export default todoPublic;
