import { z } from "zod";
export const createApiKeySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe um nome")
    .max(120, "Use até 120 caracteres"),
});
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
