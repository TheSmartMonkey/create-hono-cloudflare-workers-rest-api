import { getMessage } from '@src/service';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: getMessage() });
});

export default app;
