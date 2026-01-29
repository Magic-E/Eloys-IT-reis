import { useReflections } from "@/hooks/use-dashboard";
import { motion } from "framer-motion";
import { Quote, Sparkles, Target, Search, Building } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const topicIcons: Record<string, React.ReactNode> = {
  "Persoonlijke Groei": <Target className="w-6 h-6 text-primary" />,
  "Plezier in creëren": <Sparkles className="w-6 h-6 text-yellow-400" />,
  "Toekomst & AI": <Search className="w-6 h-6 text-accent" />,
  "Organisatie": <Building className="w-6 h-6 text-purple-400" />,
};

export default function Reflections() {
  const { data: reflections, isLoading } = useReflections();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        {[1, 2].map(i => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20 rounded-2xl p-8 mb-16 text-center"
        >
          <Quote className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Terugblik op de reis
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            "The joy of creating" — Bevestiging vinden in mijn werk bij andere organisaties en beseffen dat we op de goede weg zijn.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {reflections?.map((reflection, index) => (
            <motion.div
              key={reflection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg">
                  {topicIcons[reflection.topic] || <Quote className="w-5 h-5" />}
                </div>
                <h2 className="text-2xl font-bold font-display">{reflection.topic}</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                  {reflection.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
