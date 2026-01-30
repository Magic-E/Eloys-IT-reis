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
    if (!data) return res.status(404).json({ message: "Niet gevonden" });
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
        Je bent de Digitale Tweeling van Eloy Hoofs, Technisch Projectleider bij een overheidsorganisatie, afdeling Informatiemanagement (IM).
        
        ACHTERGROND:
        - Je bent via interesse en werkervaring in de ICT-wereld terechtgekomen, zonder formele ICT-opleiding
        - Je hebt zojuist de IT Basisopleiding bij ICM Opleidingen afgerond
        - Je rol is die van "bruggenbouwer tussen techniek en organisatie"
        - Je mist soms basiskennis om technisch door te vragen, maar bent nu een betere gesprekspartner geworden
        
        LEERDOELEN & GROEI:
        - Beter begrip van technische termen en architecturen
        - Minder snel overdonderen door vakjargon
        - Gerichter durven doorvragen bij leveranciers, beheerders en technische specialisten
        
        EYEOPENERS:
        - AI en agents (WITT-E) als digitale collega of sparringpartner - dit heeft je kijk op werken en leren sterk veranderd
        - Het verschil tussen theorie en praktijk
        - Out-of-the-box denken en "The Joy of Creating"
        
        WAARDEVOLLE ERVARINGEN:
        - Spotify API app bouwen
        - Python coderen
        - Dit interactieve leerdashboard maken met Replit
        
        TOEKOMST:
        - Slim gebruik maken van AI-hulpmiddelen
        - Gericht blijven leren waar nodig
        - Concrete uitdaging: uitfaseren van oude applicaties bij nieuwe implementaties (architectuur, informatiebeheer, besluitvorming, communicatie)
        
        Hier is een samenvatting van je opdrachten:
        ${assignments.map(a => `- ${a.title}: ${a.description} (Geleerde lessen: ${a.keyLearnings?.join(", ")})`).join("\n")}
        
        Hier zijn je persoonlijke reflecties:
        ${reflections.map(r => `- ${r.topic}: ${r.content}`).join("\n")}
        
        Je stijl: Professioneel maar enthousiast, "The Joy of Creating", enigszins technisch maar toegankelijk.
        Je hecht waarde aan: Preventie in het sociaal domein, Hybride IT, Datagedreven werken.
        Antwoord altijd in het Nederlands. Wees persoonlijk en spreek vanuit je eigen ervaring.
        
        Vraag van de gebruiker: ${message}
      `;

      const openai = new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      });
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: context },
          { role: "user", content: message }
        ],
      });

      res.json({ response: response.choices[0].message.content || "Ik kon geen antwoord genereren." });
    } catch (error) {
      console.error("AI Fout:", error);
      res.status(500).json({ message: "Geforceerd antwoord genereren mislukt" });
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getAssignments();
  if (existing.length > 0) return;

  console.log("Database aan het vullen...");

  // 1. Assignments (Opdracht 1-5)
  await storage.createAssignment({
    title: "Strategisch belang van IT",
    moduleNumber: 1,
    description: "Analyse van de rol van Informatiemanagement binnen een overheidsorganisatie met behulp van Porter's Waardeketen.",
    keyLearnings: ["Strategische afstemming is cruciaal", "Procesoptimalisatie door IT", "Verbinding tussen beleid en uitvoering"],
    date: "Okt 2025",
    icon: "Link",
  });

  await storage.createAssignment({
    title: "Hybride IT & Cloud Strategie",
    moduleNumber: 2,
    description: "Onderzoek naar hybride infrastructuur en de balans tussen 'Cloud tenzij' en digitale soevereiniteit.",
    keyLearnings: ["Common Ground principes", "Risico's van vendor lock-in", "Beheer van hybride omgevingen"],
    date: "Nov 2025",
    icon: "Cloud",
  });

  await storage.createAssignment({
    title: "Implementatie Datawarehouse",
    moduleNumber: 3,
    description: "Reflectie op de implementatie van een datawarehouse voor Leefbaarheid & Veiligheid. Focus op succes- en faalfactoren.",
    keyLearnings: ["Gebruikersbetrokkenheid is essentieel", "Organisatorische borging > Techniek", "Iteratief werken (Agile)"],
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
    title: "Reflectie: Mijn reis",
    moduleNumber: 5,
    description: "Persoonlijke terugblik op het leertraject. Van onbewust onbekwaam naar een sterkere gesprekspartner.",
    keyLearnings: ["Sterkere gesprekspartner", "Betere inschattingen maken", "Plezier in creëren"],
    date: "Jan 2026",
    icon: "Award",
  });

  // 2. Skills (Radar Chart Data)
  const skillsData = [
    { name: "IT concepten", category: "Technisch", before: 5, after: 9 },
    { name: "Gesprekspartner", category: "Soft Skill", before: 6, after: 8 },
    { name: "Architectuur", category: "Technisch", before: 6, after: 8 },
    { name: "Inschatten werk", category: "Strategisch", before: 4, after: 6 },
    { name: "Programmeren", category: "Technisch", before: 4, after: 7 },
    { name: "AI & Data", category: "Technisch", before: 6, after: 9 },
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
    topic: "Plezier in creëren",
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
