// TODO: Env variables validation and update wrangler env file
// TODO: Validate at the server level with zod

import { EnvVariables, envVariablesSchema } from '@/models/global/env.model';
import { HttpError } from '@/models/global/http.model';

let ENV_VARIABLES: EnvVariables;

export function validateEnvVariables(env: EnvVariables): void {
  if (ENV_VARIABLES) return;
  const result = envVariablesSchema.safeParse(env);
  if (!result.success) {
    throw new HttpError(500, 'ENV_VARIABLES_VALIDATION_ERROR');
  }
  setEnv(result.data);
}

export function getEnv(): EnvVariables {
  return ENV_VARIABLES;
}

export function setEnv(env: EnvVariables): void {
  ENV_VARIABLES = env;
}
