import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type IdeaInput, type ProjectIdea } from "@shared/schema";

/**
 * Deployment Safety:
 * This hook uses the centralized api object which is compatible with
 * import.meta.env.VITE_API_URL via the queryClient configuration.
 */
const API_URL = import.meta.env.VITE_API_URL || "";
if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
  console.warn("VITE_API_URL is not set in production. API calls may fail if not served from the same origin.");
}

export function useGenerateIdea() {
  return useMutation({
    mutationFn: async (data: IdeaInput) => {
      // Validate input before sending using the shared schema
      api.ideas.generate.input.parse(data);

      const path = api.ideas.generate.path;
      const fullUrl = path.startsWith("http") ? path : `${API_URL}${path}`;

      const res = await fetch(fullUrl, {
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
