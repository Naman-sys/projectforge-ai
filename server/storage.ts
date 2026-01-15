import { db } from "./db";
import { generatedIdeas } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // We strictly don't *need* storage for this app as requested, but we'll implement a basic log
  logGeneration(idea: any): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async logGeneration(idea: any): Promise<void> {
    try {
      await db.insert(generatedIdeas).values({
        domain: idea.domain || "Unknown",
        skillLevel: idea.skillLevel || "Unknown",
        projectType: idea.projectType || "Unknown",
        generatedContent: idea,
      });
    } catch (e) {
      console.error("Failed to log generation:", e);
      // Don't fail the request if logging fails
    }
  }
}

export const storage = new DatabaseStorage();
