import { useAssignments } from "@/hooks/use-dashboard";
import { motion } from "framer-motion";
import { Link2, Cloud, Database, BrainCircuit, Award, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ReactNode> = {
  Link: <Link2 className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  BrainCircuit: <BrainCircuit className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
};

export default function Journey() {
  const { data: assignments, isLoading } = useAssignments();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl bg-card/50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">My Learning Journey</h1>
          <p className="text-muted-foreground text-lg">
            From basic modules to the final assessment, track my progress through the curriculum.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-background md:-ml-0.5" />

          <div className="space-y-12">
            {assignments?.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -ml-[20px] md:-ml-[20px] w-10 h-10 rounded-full bg-background border-4 border-primary z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Spacer for layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div className="flex-1 ml-20 md:ml-0">
                    <div className="bg-card border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                            {iconMap[item.icon || "Link"] || <Link2 className="w-6 h-6" />}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Module {item.moduleNumber}
                          </span>
                        </div>
                        {item.date && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {item.keyLearnings && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-white/80 uppercase">Key Learnings</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {item.keyLearnings.map((learning, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-accent mt-1.5">•</span>
                                {learning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
