import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Zap } from "lucide-react";

export default function ApiIntegration() {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
          <h1 className="text-4xl font-display font-bold">API-integratie</h1>
        </div>

        <div className="max-w-2xl">
          <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Chuck Norris Joke API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground mb-4">
                Dit is een voorbeeld van een externe API-aanroep met behulp van de standaard JavaScript fetch-methode.
              </p>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/5 min-h-[100px] flex items-center justify-center italic text-lg text-center">
                {loading ? (
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  joke
                )}
              </div>

              <Button 
                onClick={fetchJoke} 
                disabled={loading}
                className="w-full sm:w-auto"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Nieuwe Grap Ophalen
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
