import { useSkills } from "@/hooks/use-dashboard";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Skills() {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Group skills by category if needed, or display all in one big chart
  // For this design, we'll split slightly or use color coding
  
  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Skill Evolution</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visualizing the growth from the start of the course to now. 
            The radar chart highlights my development in technical and soft skills.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card/30 border border-white/5 rounded-3xl p-4 md:p-8 aspect-square relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl pointer-events-none" />
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="name" 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Radar
                  name="Level Before"
                  dataKey="levelBefore"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Level After"
                  dataKey="levelAfter"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Details List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Detailed Breakdown</h2>
            <div className="grid gap-4">
              {skills?.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{skill.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Before</div>
                      <div className="font-mono text-muted-foreground">{skill.levelBefore}/10</div>
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="text-right">
                      <div className="text-xs text-primary font-medium">After</div>
                      <div className="font-mono text-primary font-bold text-lg">{skill.levelAfter}/10</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
