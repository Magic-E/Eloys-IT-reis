import type { Express, Request, Response } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import OpenAI from "openai";


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // === API ROUTES ===

  app.get(api.assignments.list.path, async (_req: Request, res: Response) => {
    const data = await storage.getAssignments();
    res.json(data);
  });

  app.get(
    api.assignments.get.path,
    async (req: Request<{ id: string }>, res: Response) => {
      const id = Number(req.params.id);
      const data = await storage.getAssignment(id);

      if (!data) {
        return res.status(404).json({ message: "Niet gevonden" });
      }

      res.json(data);
    }
  );

  app.get(api.skills.list.path, async (_req: Request, res: Response) => {
    const data = await storage.getSkills();
    res.json(data);
  });

  app.get(api.reflections.list.path, async (_req: Request, res: Response) => {
    const data = await storage.getReflections();
    res.json(data);
  });

  // === VLAAI API ROUTE ===

  app.get("/api/vlaai/random", async (_req: Request, res: Response) => {
    const antwoord = await storage.getRandomVlaaiAntwoord();

    if (!antwoord) {
      return res.json({ antwoord: "Geen antwoord beschikbaar" });
    }

    res.json(antwoord);
  });

  // === OPENAI CHAT ROUTE ===

  app.post(api.chat.send.path, async (req: Request, res: Response) => {
    try {
      const { message } = api.chat.send.input.parse(req.body);

      const assignments = await storage.getAssignments();
      const reflections = await storage.getReflections();

      const context = `... (context ongewijzigd) ...`;

      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 200,
        messages: [
          { role: "system", content: context },
          { role: "user", content: message }
        ],
      });

      res.json({
        response:
          response.choices[0].message.content ||
          "Ik kon geen antwoord genereren.",
      });

    } catch (error) {
      console.error("AI Fout:", error);
      res
        .status(500)
        .json({ message: "Geforceerd antwoord genereren mislukt" });
    }
  });
  return httpServer;
}
