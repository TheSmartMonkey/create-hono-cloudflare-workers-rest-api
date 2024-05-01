import { OpenAPIHono } from '@hono/zod-openapi';
import todoDoc from './api/todo/todo.doc';

const swagger = new OpenAPIHono();

// Config
swagger.doc('/public/doc', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
  bearerFormat: 'JWT',
});

// Public routes

// Auth routes
swagger.route('/todo', todoDoc);


export default swagger;
