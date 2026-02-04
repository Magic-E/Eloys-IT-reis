import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accessibility, CheckCircle, AlertCircle, HelpCircle, BarChart3, TrendingUp, ExternalLink } from "lucide-react";

const toegankelijkheidData = {
  organisatie: "Gemeente Heerlen",
  organisatieId: 281,
  laatstBijgewerkt: "04-02-2026",
  totaalWebsitesApps: 11,
  statussen: [
    { code: "A", label: "Voldoet volledig", aantal: 1, color: "bg-green-500", textColor: "text-green-500" },
    { code: "B", label: "Voldoet gedeeltelijk", aantal: 1, color: "bg-lime-500", textColor: "text-lime-500" },
    { code: "C", label: "Eerste maatregelen genomen", aantal: 0, color: "bg-yellow-500", textColor: "text-yellow-500" },
    { code: "D", label: "Voldoet niet", aantal: 0, color: "bg-orange-500", textColor: "text-orange-500" },
    { code: "E", label: "Geen verklaring", aantal: 9, color: "bg-red-500", textColor: "text-red-500" },
  ],
  vergelijking: {
    heerlen: { A: 9, B: 9, C: 0, D: 0, E: 82 },
    alleGemeenten: { A: 10, B: 37, C: 9, D: 27, E: 16 },
  },
  historie: [
    { periode: "1 jul 2022", A: 0, B: 0, C: 1, D: 0, E: 0 },
    { periode: "1 jan 2024", A: 0, B: 0, C: 1, D: 0, E: 0 },
    { periode: "1 jul 2024", A: 0, B: 0, C: 0, D: 1, E: 10 },
    { periode: "1 jan 2025", A: 1, B: 1, C: 0, D: 0, E: 10 },
    { periode: "1 jan 2026", A: 1, B: 1, C: 0, D: 0, E: 9 },
  ],
};

const gemeenteStatistieken = {
  gemeente: "Heerlen",
  gemeenteCode: "0951",
  bevolking: {
    totaal: 87461,
    huishoudens: 46072,
    dichtheid: 1948,
    oppervlakte: 45.53,
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
    eenpersoonshuishoudens: 48,
    wozWaarde: 214000,
    huurwoningen: 53,
    koopwoningen: 47,
  },
};

function StatusIcon({ code }: { code: string }) {
  if (code === "A" || code === "B") {
    return <CheckCircle className="h-5 w-5 text-green-500" aria-label="Voldoet aan wet" />;
  } else if (code === "C") {
    return <AlertCircle className="h-5 w-5 text-yellow-500" aria-label="Eerste maatregelen genomen" />;
  } else {
    return <HelpCircle className="h-5 w-5 text-red-500" aria-label="Voldoet niet aan wet" />;
  }
}

export default function DigitaleToegankelijkheid() {
  const voldoetAanWet = toegankelijkheidData.statussen
    .filter(s => ["A", "B", "C"].includes(s.code))
    .reduce((sum, s) => sum + s.aantal, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Accessibility className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">Digitale Toegankelijkheid</h1>
            <p className="text-muted-foreground">Gemeente Heerlen</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Totaal websites & apps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold" data-testid="text-total-sites">
                {toegankelijkheidData.totaalWebsitesApps}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Voldoet aan wet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500" data-testid="text-compliant">
                {voldoetAanWet} <span className="text-lg text-muted-foreground">van {toegankelijkheidData.totaalWebsitesApps}</span>
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

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Status overzicht
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {toegankelijkheidData.statussen.map((status) => (
                <div key={status.code} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon code={status.code} />
                    <div>
                      <span className="font-medium">Status {status.code}</span>
                      <span className="text-sm text-muted-foreground ml-2">{status.label}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className={`${status.aantal > 0 ? status.textColor : ""}`}>
                    {status.aantal}
                  </Badge>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Legenda</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" role="img" aria-hidden="true"></div>
                    <span>Voldoet aan wet (A, B, C)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" role="img" aria-hidden="true"></div>
                    <span>Voldoet niet aan wet (D, E)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Vergelijking met alle gemeenten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Gemeente Heerlen</h4>
                  <div className="space-y-2">
                    {Object.entries(toegankelijkheidData.vergelijking.heerlen).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status {key}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Alle gemeenten</h4>
                  <div className="space-y-2">
                    {Object.entries(toegankelijkheidData.vergelijking.alleGemeenten).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status {key}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Heerlen heeft relatief weinig verklaringen (82% status E) vergeleken met het landelijk gemiddelde (16%). 
                  Dit betekent dat veel websites nog geen toegankelijkheidsverklaring hebben gepubliceerd.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Kerncijfers Gemeente Heerlen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h4 className="font-medium mb-3">Bevolking</h4>
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
                <h4 className="font-medium mb-3">Leeftijdsverdeling</h4>
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
                <h4 className="font-medium mb-3">Herkomst</h4>
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
                <h4 className="font-medium mb-3">Wonen</h4>
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
            <CardTitle className="text-xl font-semibold">Databronnen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Accessibility className="h-4 w-4 text-primary" />
                  Digitoegankelijk.nl
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Dashboard voor digitale toegankelijkheid van overheidsorganisaties. Bevat statussen van 
                  toegankelijkheidsverklaringen voor websites en apps.
                </p>
                <a 
                  href="https://dashboard.digitoegankelijk.nl/organisaties/281" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary flex items-center gap-1 hover:underline"
                  data-testid="link-digitoegankelijk"
                >
                  Bekijk dashboard <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  CBS / Waarstaatjegemeente.nl
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Bevolkingsstatistieken en gemeentelijke kerncijfers van het Centraal Bureau voor de Statistiek 
                  en VNG benchmark portal.
                </p>
                <a 
                  href="https://www.waarstaatjegemeente.nl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary flex items-center gap-1 hover:underline"
                  data-testid="link-waarstaatjegemeente"
                >
                  Bekijk portal <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Deze data wordt informatief weergegeven en is read-only. Gemeentecode Heerlen: 0951. 
              Organisatie-ID digitoegankelijk.nl: 281.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
