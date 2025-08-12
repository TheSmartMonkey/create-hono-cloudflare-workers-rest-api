import { z } from 'zod';

export const envVariablesSchema = z.object({
  JWT_SECRET: z.string(),
});

export type EnvVariables = z.infer<typeof envVariablesSchema>;
