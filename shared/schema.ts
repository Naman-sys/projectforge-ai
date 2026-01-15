import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We don't necessarily need to store ideas, but good to have a log of generations
export const generatedIdeas = pgTable("generated_ideas", {
  id: serial("id").primaryKey(),
  domain: text("domain").notNull(),
  skillLevel: text("skill_level").notNull(),
  projectType: text("project_type").notNull(),
  generatedContent: jsonb("generated_content").notNull(), // Stores the full generated JSON
  createdAt: timestamp("created_at").defaultNow(),
});

// === API TYPES ===

export const ideaInputSchema = z.object({
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  domain: z.enum(["AIML", "Web Dev", "Data Science", "Cyber Security", "App Dev"]),
  language: z.enum(["Python", "Java", "JavaScript", "C++"]),
  projectType: z.enum(["Mini Project", "Major Project", "Startup Idea"]),
});

export const datasetEntrySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const projectIdeaSchema = z.object({
  title: z.string(),
  problemStatement: z.string(),
  description: z.string(),
  keyFeatures: z.array(z.string()),
  techStack: z.array(z.string()),
  datasetSuggestions: z.array(datasetEntrySchema).optional(),
  roadmap: z.array(z.string()),
  folderStructure: z.string(), // We'll pass this as a pre-formatted string or JSON string
  futureEnhancements: z.array(z.string()),
  // AIML Specific fields
  modelName: z.string().optional(),
  learningType: z.string().optional(),
  evaluationMetric: z.string().optional(),
});

export type IdeaInput = z.infer<typeof ideaInputSchema>;
export type ProjectIdea = z.infer<typeof projectIdeaSchema>;
export type DatasetEntry = z.infer<typeof datasetEntrySchema>;
