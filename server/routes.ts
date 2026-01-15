import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { generateProject } from "./engine";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.ideas.generate.path, async (req, res) => {
    try {
      const input = api.ideas.generate.input.parse(req.body);
      
      // Generate the project idea using our Rule-based Engine
      const idea = generateProject(input);

      // Log it (fire and forget)
      storage.logGeneration({ ...input, ...idea });

      res.json(idea);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
