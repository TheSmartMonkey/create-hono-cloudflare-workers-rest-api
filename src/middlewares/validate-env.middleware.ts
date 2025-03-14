import { ENV_VARIABLES, setEnv } from '@/common/env';
import { EnvVariables, envVariablesSchema } from '@/models/global/env.model';
import { HttpError } from '@/models/global/http.model';
import { Context, Next } from 'hono';

export async function envMiddleware(c: Context, next: Next): Promise<any> {
  validateEnvVariables(c.env);
  await next();
}

function validateEnvVariables(env: EnvVariables): void {
  if (ENV_VARIABLES) return;
  const result = envVariablesSchema.safeParse(env);
  if (!result.success) {
    throw new HttpError(500, 'ENV_VARIABLES_VALIDATION_ERROR');
  }
  setEnv(result.data);
}
