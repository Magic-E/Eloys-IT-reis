import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BrainCircuit, Database, Layers, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/images/hero-learning.jpg";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              <Rocket className="w-4 h-4" />
              IT Basisopleiding Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              The Joy of <br />
              <span className="text-gradient">Creating Future IT</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Ontdek mijn reis door de IT-modules, van datawarehousing tot AI-innovatie. 
              Bekijk de vaardigheden die ik heb ontwikkeld en de projecten die ik heb gebouwd.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10">
              <img 
                src={heroImage} 
                alt="Leren en innoveren" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-sm font-medium text-primary mb-1">Eloy Hoofs</p>
                  <p className="text-xs text-muted-foreground">Technisch Projectleider @ Gemeente Heerlen</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* Quick Stats / Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Database className="w-8 h-8 text-accent" />}
            title="Data & Hybride IT"
            description="De basis van moderne infrastructuur en datawarehousing onder de knie."
            delay={0.3}
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
            delay={0.5}
          />
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
