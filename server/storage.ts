import { db } from "./db";
import {
  assignments,
  skills,
  reflections,
  type Assignment,
  type Skill,
  type Reflection,
  type InsertAssignment,
  type InsertSkill,
  type InsertReflection,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAssignments(): Promise<Assignment[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  getSkills(): Promise<Skill[]>;
  getReflections(): Promise<Reflection[]>;
  
  // Seed methods
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  createReflection(reflection: InsertReflection): Promise<Reflection>;
}

export class DatabaseStorage implements IStorage {
  async getAssignments(): Promise<Assignment[]> {
    return await db.select().from(assignments).orderBy(assignments.moduleNumber);
  }

  async getAssignment(id: number): Promise<Assignment | undefined> {
    const [assignment] = await db.select().from(assignments).where(eq(assignments.id, id));
    return assignment;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getReflections(): Promise<Reflection[]> {
    return await db.select().from(reflections);
  }

  async createAssignment(insertAssignment: InsertAssignment): Promise<Assignment> {
    const [assignment] = await db.insert(assignments).values(insertAssignment).returning();
    return assignment;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }

  async createReflection(insertReflection: InsertReflection): Promise<Reflection> {
    const [reflection] = await db.insert(reflections).values(insertReflection).returning();
    return reflection;
  }
}

export const storage = new DatabaseStorage();
