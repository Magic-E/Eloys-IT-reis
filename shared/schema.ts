import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  moduleNumber: integer("module_number").notNull(),
  description: text("description").notNull(),
  keyLearnings: text("key_learnings").array(), // List of bullet points
  date: text("date"), // Display date e.g. "Oct 2025"
  icon: text("icon"), // Lucide icon name
  contentParams: jsonb("content_params"), // Flexible content for detailed view
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // "Technisch", "Soft Skill", "Strategisch"
  levelBefore: integer("level_before").notNull(), // 1-10
  levelAfter: integer("level_after").notNull(), // 1-10
});

export const reflections = pgTable("reflections", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(), // "Plezier in creëren", "Toekomst", "Intake Review"
  content: text("content").notNull(),
});

// === EXPLICIT API CONTRACT TYPES ===

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = typeof assignments.$inferInsert;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = typeof skills.$inferInsert;

export type Reflection = typeof reflections.$inferSelect;
export type InsertReflection = typeof reflections.$inferInsert;

// Chat types
export const chatRequestSchema = z.object({
  message: z.string(),
});
export type ChatRequest = z.infer<typeof chatRequestSchema>;

export interface ChatResponse {
  response: string;
}
