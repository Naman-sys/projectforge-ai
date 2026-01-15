import { z } from "zod";
import { ideaInputSchema, projectIdeaSchema } from "./schema";

export const api = {
  ideas: {
    generate: {
      method: "POST" as const,
      path: "/api/generate",
      input: ideaInputSchema,
      responses: {
        200: projectIdeaSchema,
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};
