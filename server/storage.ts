import { db } from "./db";
import {
  assignments,
  skills,
  reflections,
  vlaaiAntwoorden,
  type Assignment,
  type Skill,
  type Reflection,
  type VlaaiAntwoord,
  type InsertAssignment,
  type InsertSkill,
  type InsertReflection,
  type InsertVlaaiAntwoord,
} from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getAssignments(): Promise<Assignment[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  getSkills(): Promise<Skill[]>;
  getReflections(): Promise<Reflection[]>;
  getRandomVlaaiAntwoord(): Promise<VlaaiAntwoord | undefined>;
  getAllVlaaiAntwoorden(): Promise<VlaaiAntwoord[]>;
  
  // Seed methods
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  createReflection(reflection: InsertReflection): Promise<Reflection>;
  createVlaaiAntwoord(antwoord: InsertVlaaiAntwoord): Promise<VlaaiAntwoord>;
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

  async getRandomVlaaiAntwoord(): Promise<VlaaiAntwoord | undefined> {
    const [antwoord] = await db.select().from(vlaaiAntwoorden).orderBy(sql`RANDOM()`).limit(1);
    return antwoord;
  }

  async getAllVlaaiAntwoorden(): Promise<VlaaiAntwoord[]> {
    return await db.select().from(vlaaiAntwoorden);
  }

  async createVlaaiAntwoord(insertAntwoord: InsertVlaaiAntwoord): Promise<VlaaiAntwoord> {
    const [antwoord] = await db.insert(vlaaiAntwoorden).values(insertAntwoord).returning();
    return antwoord;
  }
}

export const storage = new DatabaseStorage();
