// TODO: Env variables validation and update wrangler env file
import { EnvVariables } from '@/models/global/env.model';

export let ENV_VARIABLES: EnvVariables;

export function getEnv(): EnvVariables {
  return ENV_VARIABLES;
}

export function setEnv(env: EnvVariables): void {
  ENV_VARIABLES = env;
}
