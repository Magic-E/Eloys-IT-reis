import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Zap, Cake, Accessibility, BarChart3, ExternalLink, CheckCircle, AlertCircle, HelpCircle, TrendingUp } from "lucide-react";

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

function getRandomVlaaiAnswer(): string {
  const index = Math.floor(Math.random() * vlaaiAntwoorden.length);
  return vlaaiAntwoorden[index];
}

const toegankelijkheidData = {
  organisatie: "Gemeente Heerlen",
  organisatieId: 281,
  laatstBijgewerkt: "04-02-2026",
  totaalWebsitesApps: 11,
  statussen: [
    { code: "A", label: "Voldoet volledig", aantal: 1, textColor: "text-green-500" },
    { code: "B", label: "Voldoet gedeeltelijk", aantal: 1, textColor: "text-lime-500" },
    { code: "C", label: "Eerste maatregelen genomen", aantal: 0, textColor: "text-yellow-500" },
    { code: "D", label: "Voldoet niet", aantal: 0, textColor: "text-orange-500" },
    { code: "E", label: "Geen verklaring", aantal: 9, textColor: "text-red-500" },
  ],
  vergelijking: {
    heerlen: { A: 9, B: 9, C: 0, D: 0, E: 82 },
    alleGemeenten: { A: 10, B: 37, C: 9, D: 27, E: 16 },
  },
};

const gemeenteStatistieken = {
  gemeente: "Heerlen",
  gemeenteCode: "0951",
  bevolking: {
    totaal: 87461,
    huishoudens: 46072,
    dichtheid: 1948,
  },
  leeftijdsverdeling: [
    { groep: "0-14 jaar", percentage: 13 },
    { groep: "15-24 jaar", percentage: 10 },
    { groep: "25-44 jaar", percentage: 25 },
    { groep: "45-64 jaar", percentage: 28 },
    { groep: "65+ jaar", percentage: 24 },
  ],
  herkomst: [
    { type: "Nederlandse herkomst", percentage: 67 },
    { type: "Europese herkomst", percentage: 16 },
    { type: "Niet-Europese herkomst", percentage: 17 },
  ],
  wonen: {
    gemiddeldeHuishoudensgrootte: 1.9,
    wozWaarde: 214000,
    huurwoningen: 53,
    koopwoningen: 47,
  },
};

function StatusIcon({ code }: { code: string }) {
  if (code === "A" || code === "B") {
    return <CheckCircle className="h-4 w-4 text-green-500" aria-label="Voldoet aan wet" />;
  } else if (code === "C") {
    return <AlertCircle className="h-4 w-4 text-yellow-500" aria-label="Eerste maatregelen genomen" />;
  } else {
    return <HelpCircle className="h-4 w-4 text-red-500" aria-label="Voldoet niet aan wet" />;
  }
}

export default function ApiIntegration() {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [vlaaiAnswer, setVlaaiAnswer] = useState<string>(() => getRandomVlaaiAnswer());

  const refreshVlaai = () => {
    setVlaaiAnswer(getRandomVlaaiAnswer());
  };

  const voldoetAanWet = toegankelijkheidData.statussen
    .filter(s => ["A", "B", "C"].includes(s.code))
    .reduce((sum, s) => sum + s.aantal, 0);

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
                  <p className="text-sm text-muted-foreground mb-3">Is er vlaai op kantoor?</p>
                  <motion.div
                    key={vlaaiAnswer}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                  >
                    <p className="text-3xl md:text-4xl font-display font-bold text-amber-500" data-testid="text-vlaai-answer">
                      {vlaaiAnswer}
                    </p>
                  </motion.div>
                </div>

                <Button 
                  onClick={refreshVlaai}
                  className="w-full"
                  data-testid="button-refresh-vlaai"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Opnieuw vragen
                </Button>
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

          <div className="flex items-center gap-3 mt-8 mb-4">
            <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Accessibility className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-display font-semibold">Digitoegankelijk.nl Dashboard</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Totaal websites & apps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" data-testid="text-total-sites">
                  {toegankelijkheidData.totaalWebsitesApps}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Voldoet aan wet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500" data-testid="text-compliant">
                  {voldoetAanWet} <span className="text-base text-muted-foreground">van {toegankelijkheidData.totaalWebsitesApps}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Laatst bijgewerkt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold" data-testid="text-last-updated">
                  {toegankelijkheidData.laatstBijgewerkt}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Status overzicht
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {toegankelijkheidData.statussen.map((status) => (
                  <div key={status.code} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusIcon code={status.code} />
                      <div>
                        <span className="font-medium text-sm">Status {status.code}</span>
                        <span className="text-xs text-muted-foreground ml-2">{status.label}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`${status.aantal > 0 ? status.textColor : ""}`}>
                      {status.aantal}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Vergelijking met alle gemeenten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Gemeente Heerlen</h4>
                    <div className="space-y-1">
                      {Object.entries(toegankelijkheidData.vergelijking.heerlen).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Status {key}</span>
                          <span className="font-medium">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Alle gemeenten</h4>
                    <div className="space-y-1">
                      {Object.entries(toegankelijkheidData.vergelijking.alleGemeenten).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Status {key}</span>
                          <span className="font-medium">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-3 mt-8 mb-4">
            <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-green-500" />
            </div>
            <h2 className="text-2xl font-display font-semibold">Waarstaatjegemeente.nl / CBS</h2>
          </div>

          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Kerncijfers Gemeente Heerlen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h4 className="font-medium text-sm mb-3">Bevolking</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inwoners</span>
                      <span className="font-medium">{gemeenteStatistieken.bevolking.totaal.toLocaleString("nl-NL")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Huishoudens</span>
                      <span className="font-medium">{gemeenteStatistieken.bevolking.huishoudens.toLocaleString("nl-NL")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dichtheid</span>
                      <span className="font-medium">{gemeenteStatistieken.bevolking.dichtheid}/km²</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-3">Leeftijdsverdeling</h4>
                  <div className="space-y-2 text-sm">
                    {gemeenteStatistieken.leeftijdsverdeling.map((item) => (
                      <div key={item.groep} className="flex justify-between">
                        <span className="text-muted-foreground">{item.groep}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-3">Herkomst</h4>
                  <div className="space-y-2 text-sm">
                    {gemeenteStatistieken.herkomst.map((item) => (
                      <div key={item.type} className="flex justify-between">
                        <span className="text-muted-foreground">{item.type}</span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-3">Wonen</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gem. huishouden</span>
                      <span className="font-medium">{gemeenteStatistieken.wonen.gemiddeldeHuishoudensgrootte} pers.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">WOZ-waarde</span>
                      <span className="font-medium">€{(gemeenteStatistieken.wonen.wozWaarde / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Huur / Koop</span>
                      <span className="font-medium">{gemeenteStatistieken.wonen.huurwoningen}% / {gemeenteStatistieken.wonen.koopwoningen}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Databronnen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Accessibility className="h-4 w-4 text-primary" />
                    Digitoegankelijk.nl
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Dashboard voor digitale toegankelijkheid. Organisatie-ID: 281
                  </p>
                  <a 
                    href="https://dashboard.digitoegankelijk.nl/organisaties/281" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary flex items-center gap-1 hover:underline"
                    data-testid="link-digitoegankelijk-api"
                  >
                    Bekijk dashboard <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Waarstaatjegemeente.nl / CBS
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    VNG benchmark portal. Gemeentecode: 0951
                  </p>
                  <a 
                    href="https://www.waarstaatjegemeente.nl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary flex items-center gap-1 hover:underline"
                    data-testid="link-waarstaatjegemeente-api"
                  >
                    Bekijk portal <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
