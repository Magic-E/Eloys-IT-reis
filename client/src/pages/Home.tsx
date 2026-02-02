import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BrainCircuit, Database, Layers, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import slideDashboard from "@/assets/images/hero-learning.jpg";
import slideSmartForest from "@/assets/images/slide-smart-forest.png";
import slideHouse from "@/assets/images/slide-house.jpg";
import slideVibe from "@/assets/images/slide-vibe.png";
import slideMarshmallow from "@/assets/images/slide-marshmallow.png";
import slideVijflagen from "@/assets/images/slide-vijflagen.png";

const slides = [
  { image: slideDashboard },
  { image: slideSmartForest },
  { image: slideHouse },
  { image: slideVibe },
  { image: slideMarshmallow },
  { image: slideVijflagen },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

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
            <p className="text-sm text-primary/80 font-medium mb-2">
              Eloy Hoofs | Technisch Projectleider | Gemeente, afdeling Informatiemanagement
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Als bruggenbouwer tussen techniek en organisatie heb ik de IT Basisopleiding doorlopen. 
              Ontdek mijn reis van datawarehousing tot AI-innovatie, en de vaardigheden die ik heb ontwikkeld.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/journey">
                <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto" data-testid="button-view-timeline">
                  Bekijk tijdlijn <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold w-full sm:w-auto" data-testid="button-check-skills">
                  Bekijk vaardigheden
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 aspect-[4/3] bg-black/20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  alt="Slide afbeelding"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-contain absolute inset-0"
                />
              </AnimatePresence>
              
              {/* Navigation arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                data-testid="button-prev-slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                data-testid="button-next-slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide 
                      ? "bg-primary w-6" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  data-testid={`button-slide-${idx}`}
                />
              ))}
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
