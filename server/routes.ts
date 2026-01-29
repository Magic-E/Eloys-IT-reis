import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === API ROUTES ===

  app.get(api.assignments.list.path, async (req, res) => {
    const data = await storage.getAssignments();
    res.json(data);
  });

  app.get(api.assignments.get.path, async (req, res) => {
    const data = await storage.getAssignment(Number(req.params.id));
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const data = await storage.getSkills();
    res.json(data);
  });

  app.get(api.reflections.list.path, async (req, res) => {
    const data = await storage.getReflections();
    res.json(data);
  });

  // === OPENAI CHAT ROUTE ===
  app.post(api.chat.send.path, async (req, res) => {
    try {
      const { message } = api.chat.send.input.parse(req.body);
      
      const assignments = await storage.getAssignments();
      const reflections = await storage.getReflections();
      
      const context = `
        You are Eloy Hoofs' Digital Twin, a Technical Project Leader at Gemeente Heerlen.
        You have just completed an IT Basisopleiding (Basic IT Training).
        
        Here is a summary of your assignments:
        ${assignments.map(a => `- ${a.title}: ${a.description} (Learnings: ${a.keyLearnings?.join(", ")})`).join("\n")}
        
        Here are your personal reflections:
        ${reflections.map(r => `- ${r.topic}: ${r.content}`).join("\n")}
        
        Your style: Professional but enthusiastic, "Joy of creating", slightly technical but accessible.
        You value: Prevention in social domain, Hybrid IT, Data-driven work.
        
        User question: ${message}
      `;

      const openai = new OpenAI();
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: context },
          { role: "user", content: message }
        ],
      });

      res.json({ response: response.choices[0].message.content || "I couldn't generate a response." });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ message: "Failed to generate response" });
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getAssignments();
  if (existing.length > 0) return;

  console.log("Seeding database...");

  // 1. Assignments (Opdracht 1-5)
  await storage.createAssignment({
    title: "Waardeketen & IM Rol",
    moduleNumber: 1,
    description: "Analyse van de rol van Informatiemanagement binnen Gemeente Heerlen met behulp van Porter's Waardeketen.",
    keyLearnings: ["Strategische afstemming is cruciaal", "Procesoptimalisatie door IT", "Verbinding tussen beleid en uitvoering"],
    date: "Okt 2025",
    icon: "Link",
  });

  await storage.createAssignment({
    title: "Hybride IT & Cloud Strategie",
    moduleNumber: 2,
    description: "Onderzoek naar de hybride infrastructuur (Solido & Cloud) en de balans tussen 'Cloud tenzij' en digitale soevereiniteit.",
    keyLearnings: ["Common Ground principes", "Risico's van vendor lock-in", "Beheer van hybride omgevingen"],
    date: "Nov 2025",
    icon: "Cloud",
  });

  await storage.createAssignment({
    title: "Implementatie Datawarehouse",
    moduleNumber: 3,
    description: "Reflectie op de implementatie van een datawarehouse voor Leefbaarheid & Veiligheid. Focus op succes- en faalfactoren.",
    keyLearnings: ["Gebruikersbetrokkenheid is key", "Organisatorische borging > Techniek", "Iteratief werken (Agile)"],
    date: "Dec 2025",
    icon: "Database",
  });

  await storage.createAssignment({
    title: "AI Innovatie: Vroegsignalering",
    moduleNumber: 4,
    description: "Innovatiecanvas voor AI-gedreven vroegsignalering in het Sociaal Domein om preventief te handelen bij schulden/zorg.",
    keyLearnings: ["Ethische kaders bij AI", "Van data naar voorspelling", "Ondersteuning van consulenten"],
    date: "Jan 2026",
    icon: "BrainCircuit",
  });

  await storage.createAssignment({
    title: "Reflectie: Mijn Reis",
    moduleNumber: 5,
    description: "Persoonlijke terugblik op het leertraject. Van onbewust onbekwaam naar een sterkere gesprekspartner.",
    keyLearnings: ["Sterkere gesprekspartner", "Betere inschattingen maken", "The joy of creating"],
    date: "Jan 2026",
    icon: "Award",
  });

  // 2. Skills (Radar Chart Data)
  const skillsData = [
    { name: "IT Concepten", category: "Technical", before: 4, after: 8 },
    { name: "Gesprekspartner", category: "Soft Skill", before: 5, after: 9 },
    { name: "Architectuur", category: "Technical", before: 3, after: 7 },
    { name: "Inschatten Werk", category: "Strategic", before: 4, after: 8 },
    { name: "Cloud/SaaS", category: "Technical", before: 5, after: 8 },
    { name: "AI & Data", category: "Technical", before: 6, after: 9 },
  ];

  for (const s of skillsData) {
    await storage.createSkill({
      name: s.name,
      category: s.category,
      levelBefore: s.before,
      levelAfter: s.after,
    });
  }

  // 3. Reflections
  await storage.createReflection({
    topic: "Persoonlijke Groei",
    content: "Ik ben gegroeid van iemand die 'in het vak gerold' is naar een technisch projectleider die de fundamenten begrijpt. Ik kan nu leveranciers kritisch bevragen en laat me niet meer overdonderen door jargon.",
  });

  await storage.createReflection({
    topic: "The Joy of Creating",
    content: "Het leukste aspect van mijn werk en dit traject is het creëren. Iets bouwen dat waarde toevoegt. Deze dashboard-applicatie zelf is daar het bewijs van: 'Out of the box' denken en nieuwe technologieën (AI) inzetten.",
  });

  await storage.createReflection({
    topic: "Toekomst & AI",
    content: "De impact van AI gaat enorm zijn, vooral in het sociaal domein (preventie). Ik zie mijn rol als verbinder tussen deze nieuwe technische mogelijkheden en de ethische/praktische toepassing binnen de overheid.",
  });
  
  await storage.createReflection({
    topic: "Organisatie",
    content: "Bevestiging dat we als afdeling goed bezig zijn. Onze Prince2 agile is misschien niet altijd 'echt' agile door aanbestedingen, maar we boeken resultaat door praktijkgericht te blijven.",
  });
}
