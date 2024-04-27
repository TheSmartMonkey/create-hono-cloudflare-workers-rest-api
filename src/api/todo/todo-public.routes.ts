import { controller } from '@src/middlewares/controller.middleware';
import { Hono } from 'hono';
import { getAllTodosController } from './todo.contoller';

const todoPublic = new Hono();

todoPublic.get('/', controller(getAllTodosController));

export default todoPublic;
