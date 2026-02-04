import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Zap, Cake, Accessibility, BarChart3, ExternalLink } from "lucide-react";

const vlaaiAntwoorden = [
  "Ja!",
  "Natuurlijk!",
  "Absoluut!",
  "Zeker weten!",
  "100%!",
  "Komt eraan...",
  "Is al op!",
  "Bijna...",
  "Even afwachten!",
  "Misschien...",
  "Wordt aan gewerkt!",
  "De bakker is onderweg!",
  "Vandaag is vlaaidag!",
  "Alleen als je lief vraagt!",
  "Er staat er eentje klaar!",
  "Warm uit de oven!",
  "Wie jarig is trakteert!",
  "Limburgse traditie!",
  "Met slagroom erbij!",
  "Kersenvlaai vandaag!",
  "Rijstevlaai special!",
  "Abrikozenvlaai alert!",
  "Pruimenvlaai loading...",
  "Appelvlaai incoming!",
  "Gegarandeerd vers!",
  "De koffie staat ook klaar!",
  "Vraag het de stagiair!",
  "Check de kantine!",
  "Ruik je het al?",
  "Geduld wordt beloond!",
];

function getDailyVlaaiAnswer(): string {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % vlaaiAntwoorden.length;
  return vlaaiAntwoorden[index];
}

export default function ApiIntegration() {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const vlaaiAnswer = useMemo(() => getDailyVlaaiAnswer(), []);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      setJoke("Kon geen grap ophalen. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold">API-integraties</h1>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  <Cake className="h-6 w-6 text-amber-500" />
                  Vlaai API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  De belangrijkste vraag van de dag voor elke Limburgse werkvloer.
                </p>
                
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-3">Is er vandaag vlaai op kantoor?</p>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                  >
                    <p className="text-3xl md:text-4xl font-display font-bold text-amber-500" data-testid="text-vlaai-answer">
                      {vlaaiAnswer}
                    </p>
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Antwoord wordt dagelijks vernieuwd
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-3">
                  Chuck Norris Joke API
                  <img src="https://api.chucknorris.io/img/avatar/chuck-norris.png" alt="Chuck Norris" className="h-8 w-8" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Voorbeeld van een externe API-aanroep (GET) in JSON-formaat.
                </p>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 min-h-[100px] flex items-center justify-center italic text-sm text-center">
                  {loading ? (
                    <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    joke
                  )}
                </div>

                <Button 
                  onClick={fetchJoke} 
                  disabled={loading}
                  className="w-full"
                  data-testid="button-fetch-joke"
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Nieuwe grap
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-3">
                <Accessibility className="h-6 w-6 text-blue-500" />
                Digitoegankelijk.nl API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Dashboard voor digitale toegankelijkheid van overheidsorganisaties. Toont de status van 
                toegankelijkheidsverklaringen voor websites en mobiele apps van Gemeente Heerlen.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Organisatie-ID:</span>
                    <span className="ml-2 font-mono">281</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2">JSON Dashboard</span>
                  </div>
                </div>
              </div>
              <a 
                href="https://dashboard.digitoegankelijk.nl/organisaties/281" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary flex items-center gap-1 hover:underline"
                data-testid="link-digitoegankelijk-api"
              >
                Bekijk live dashboard <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-green-500" />
                Waarstaatjegemeente.nl API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                VNG benchmark portal met statistieken en kerncijfers van Nederlandse gemeenten. Bevolkingsdata, 
                sociaal-economische indicatoren en vergelijkingen tussen gemeenten.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Gemeentecode:</span>
                    <span className="ml-2 font-mono">0951</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2">OData JSON API</span>
                  </div>
                </div>
              </div>
              <a 
                href="https://www.waarstaatjegemeente.nl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary flex items-center gap-1 hover:underline"
                data-testid="link-waarstaatjegemeente-api"
              >
                Bekijk portal <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
