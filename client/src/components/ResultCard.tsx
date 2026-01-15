import { ProjectIdea } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Code, 
  Layers, 
  Lightbulb, 
  ListChecks, 
  Rocket, 
  Database,
  Terminal
} from "lucide-react";

interface ResultCardProps {
  idea: ProjectIdea;
}

export function ResultCard({ idea }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border-t-4 border-t-accent shadow-2xl shadow-accent/5">
        
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <Lightbulb className="w-6 h-6" />
            </div>
            <Badge variant="outline" className="border-accent/50 text-accent px-3 py-1">
              Generated Project
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            {idea.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {idea.problemStatement}
          </p>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 min-h-0 bg-black/20">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="px-8 pt-2 border-b border-white/5">
              <TabsList className="bg-transparent h-auto p-0 gap-6">
                <TabTrigger value="overview" icon={Layers} label="Overview" />
                <TabTrigger value="tech" icon={Code} label="Tech Stack" />
                <TabTrigger value="roadmap" icon={Rocket} label="Roadmap" />
                <TabTrigger value="structure" icon={Terminal} label="Structure" />
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-8">
                <TabsContent value="overview" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Section title="Description" content={idea.description} />
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                      <ListChecks className="w-5 h-5" /> Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {idea.keyFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                      <Rocket className="w-5 h-5" /> Future Enhancements
                    </h3>
                    <div className="space-y-2">
                      {idea.futureEnhancements.map((item, i) => (
                        <p key={i} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/20">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">Recommended Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {idea.techStack.map((tech, i) => (
                        <Badge key={i} className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/20 px-4 py-2 text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {idea.datasetSuggestions && idea.datasetSuggestions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5" /> Recommended Datasets
                      </h3>
                      <ul className="space-y-2">
                        {idea.datasetSuggestions.map((ds, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 bg-accent rounded-full" />
                            {ds}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="roadmap" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-accent before:to-transparent">
                    {idea.roadmap.map((step, i) => (
                      <div key={i} className="relative flex items-start pl-8 group">
                        <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-background bg-primary group-hover:bg-accent transition-colors shadow-lg shadow-primary/20" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide opacity-70 mb-1">
                            Phase {i + 1}
                          </h4>
                          <p className="text-gray-300 bg-white/5 p-4 rounded-lg border border-white/5 group-hover:border-primary/30 transition-colors">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="structure" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur group-hover:opacity-40 transition duration-500" />
                    <pre className="relative p-6 rounded-xl bg-black/60 border border-white/10 font-mono text-sm text-green-400 overflow-x-auto">
                      <code>{idea.folderStructure}</code>
                    </pre>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}

function TabTrigger({ value, icon: Icon, label }: { value: string; icon: any; label: string }) {
  return (
    <TabsTrigger 
      value={value}
      className="data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 text-muted-foreground hover:text-foreground transition-all"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
    </TabsTrigger>
  );
}
