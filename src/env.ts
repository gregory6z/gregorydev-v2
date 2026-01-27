import { z } from "zod/v4";

const envSchema = z.object({
  VITE_API_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
