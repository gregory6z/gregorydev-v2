import { z } from "zod/v4";

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_REFRESH_BUFFER_MINUTES: z.coerce.number().optional().default(10),
});

export const env = envSchema.parse(import.meta.env);
