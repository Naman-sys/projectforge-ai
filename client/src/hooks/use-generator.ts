import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type IdeaInput, type ProjectIdea } from "@shared/schema";

export function useGenerateIdea() {
  return useMutation({
    mutationFn: async (data: IdeaInput) => {
      // Validate input before sending using the shared schema
      // This throws if the data doesn't match the enum values
      api.ideas.generate.input.parse(data);

      const res = await fetch(api.ideas.generate.path, {
        method: api.ideas.generate.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate idea");
      }

      const result = await res.json();
      // Validate response structure
      return api.ideas.generate.responses[200].parse(result);
    },
  });
}
