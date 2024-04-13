import { Hono } from 'hono';
import { getMessage } from './service';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: getMessage() });
});

export default app;
