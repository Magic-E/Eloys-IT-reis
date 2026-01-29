import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BrainCircuit, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              IT Basisopleiding Portfolio
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              The Joy of <br />
              <span className="text-gradient">Creating Future IT</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Ontdek mijn reis door de IT-modules, van datawarehousing tot AI-innovatie. 
              Bekijk de vaardigheden die ik heb ontwikkeld en de projecten die ik heb gebouwd.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/journey">
                <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto" data-testid="button-view-timeline">
                  Bekijk tijdlijn <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto bg-white/5 border-white/10 hover:bg-white/10" data-testid="button-check-skills">
                  Bekijk vaardigheden
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats / Highlights */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Database className="w-8 h-8 text-accent" />}
              title="Data & Hybride IT"
              description="De basis van moderne infrastructuur en datawarehousing onder de knie."
              delay={0.2}
            />
            <FeatureCard 
              icon={<BrainCircuit className="w-8 h-8 text-primary" />}
              title="AI & Innovatie"
              description="Verkenning van de impact van AI-agents en toekomstige technologietrends."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Layers className="w-8 h-8 text-purple-400" />}
              title="Agile & Prince2"
              description="De brug slaan tussen strakke planning en agile uitvoering."
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-card/50 border border-white/5 backdrop-blur-sm hover:border-primary/50 transition-colors"
    >
      <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-center md:text-left">{title}</h3>
      <p className="text-muted-foreground text-center md:text-left">{description}</p>
    </motion.div>
  );
}
