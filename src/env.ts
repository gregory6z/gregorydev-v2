import { z } from "zod/v4";

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_ENV: z
    .enum(["dev", "preprod", "test", "prod"])
    .optional()
    .default("prod"),
  VITE_REFRESH_BUFFER_MINUTES: z.coerce.number().optional().default(10),
  VITE_MAX_FILE_SIZE_MB: z.coerce.number().optional().default(10),
  VITE_ACCEPTED_FILE_EXTENSIONS: z
    .string()
    .optional()
    .default(".pdf,.xlsx,.xls"),
});

const parsedEnv = envSchema.parse(import.meta.env);

export const env = {
  ...parsedEnv,
  MAX_FILE_SIZE: parsedEnv.VITE_MAX_FILE_SIZE_MB * 1024 * 1024,
  ACCEPTED_FILE_EXTENSIONS: parsedEnv.VITE_ACCEPTED_FILE_EXTENSIONS.split(
    ",",
  ) as readonly string[],
};
