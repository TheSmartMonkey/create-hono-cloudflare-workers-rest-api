import { OpenAPIHono } from '@hono/zod-openapi';
import { controller } from '@src/middlewares/controller.middleware';
import { OpenAPIRoute } from '@src/middlewares/open-api.middleware';
import { getAllTodosController } from './todo.contoller';

const todoPublic = new OpenAPIHono();

todoPublic.openapi(OpenAPIRoute.get('/'), controller(getAllTodosController));

export default todoPublic;
