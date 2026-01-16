import { ProjectIdea } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Code, 
  Layers, 
  Lightbulb, 
  ListChecks, 
  Rocket, 
  Database,
  Terminal,
  Brain,
  TrendingUp,
  ClipboardCheck,
  Copy,
  GitMerge,
  Zap,
  Cpu,
  FileCode
} from "lucide-react";

interface ResultCardProps {
  idea: ProjectIdea;
}

export function ResultCard({ idea }: ResultCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = `
Project Title: ${idea.title}
Problem Statement: ${idea.problemStatement}
Description: ${idea.description}

Key Features:
${idea.keyFeatures.map(f => "- " + f).join('\n')}

Tech Stack:
${idea.techStack.join(', ')}

Roadmap:
${idea.roadmap.map((r, i) => `${i + 1}. ${r}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Project idea copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full relative pb-10"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border-t-4 border-t-accent shadow-2xl shadow-accent/5">
        
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Lightbulb className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="border-accent/50 text-accent px-3 py-1">
                Generated Project
              </Badge>
            </div>
            <Button 
              size="sm"
              variant="outline"
              onClick={copyToClipboard}
              className="bg-white/5 border-white/10 hover:border-primary/50 text-xs h-8"
            >
              {copied ? (
                <><ClipboardCheck className="w-3.5 h-3.5 mr-2 text-green-400" /> Copied!</>
              ) : (
                <><Copy className="w-3.5 h-3.5 mr-2" /> Copy Idea</>
              )}
            </Button>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {idea.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {idea.problemStatement}
          </p>
        </div>

        {/* Content Tabs */}
        <div className="flex-1 min-h-0 bg-background/40">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <div className="px-8 pt-2 border-b border-white/5">
              <ScrollArea className="w-full">
                <TabsList className="bg-transparent h-auto p-0 gap-6 flex whitespace-nowrap">
                  <TabTrigger value="overview" icon={Layers} label="Overview" />
                  <TabTrigger value="tech" icon={Code} label="Tech Stack" />
                  {idea.mlPipeline && <TabTrigger value="pipeline" icon={GitMerge} label="ML Pipeline" />}
                  {idea.codeTemplates && idea.codeTemplates.length > 0 && <TabTrigger value="templates" icon={FileCode} label="Code Templates" />}
                  <TabTrigger value="roadmap" icon={Rocket} label="Roadmap" />
                  <TabTrigger value="structure" icon={Terminal} label="Structure" />
                </TabsList>
              </ScrollArea>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-8">
                <TabsContent value="overview" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* AI Specific Metrics */}
                  {(idea.modelName || idea.learningType) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-[10px] font-bold text-accent uppercase">Model</p>
                          <p className="text-sm font-semibold text-foreground">{idea.modelName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-[10px] font-bold text-accent uppercase">Metric</p>
                          <p className="text-sm font-semibold text-foreground">{idea.evaluationMetric}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-[10px] font-bold text-accent uppercase">Type</p>
                          <p className="text-sm font-semibold text-foreground">{idea.learningType}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advanced Metadata */}
                  {idea.advancedMetadata && (
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                          <Zap className="w-4 h-4" /> Advanced Level Depth
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {idea.advancedMetadata.optimization && (
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-primary uppercase">Optimization</p>
                              <p className="text-xs text-foreground/90">{idea.advancedMetadata.optimization}</p>
                            </div>
                          )}
                          {idea.advancedMetadata.explainability && (
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-primary uppercase">Explainability</p>
                              <p className="text-xs text-foreground/90">{idea.advancedMetadata.explainability}</p>
                            </div>
                          )}
                          {idea.advancedMetadata.scalability && (
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-primary uppercase">Scalability</p>
                              <p className="text-xs text-foreground/90">{idea.advancedMetadata.scalability}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <Section title="Description" content={idea.description} />
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                      <ListChecks className="w-5 h-5" /> Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {idea.keyFeatures.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">Industry Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {idea.techStack.map((tech, i) => (
                        <Badge key={i} className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/40 px-4 py-2 text-sm font-semibold">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {idea.datasetSuggestions && idea.datasetSuggestions.length > 0 && (
                    <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
                      <h3 className="text-lg font-semibold text-accent mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5" /> Research Datasets
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {idea.datasetSuggestions.map((ds, i) => (
                          <div key={i} className="space-y-1">
                            <p className="text-sm font-bold text-foreground flex items-center gap-2">
                              <span className="w-1 h-1 bg-accent rounded-full" />
                              {ds.name}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed pl-3">
                              {ds.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {idea.mlPipeline && (
                  <TabsContent value="pipeline" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      {idea.mlPipeline.map((step, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-white/5 hover:border-primary/40 transition-all group">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 border border-primary/20">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{step.stage}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )}

                <TabsContent value="templates" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {idea.codeTemplates?.map((template, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-accent flex items-center gap-2">
                          <FileCode className="w-4 h-4" /> {template.filename}
                        </h4>
                        <Badge variant="outline" className="text-[10px] uppercase">{template.language}</Badge>
                      </div>
                      <div className="relative group">
                        <pre className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-primary-foreground overflow-x-auto">
                          <code>{template.content}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="roadmap" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-accent before:to-transparent">
                    {idea.roadmap.map((step, i) => (
                      <div key={i} className="relative flex items-start pl-8 group">
                        <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-background bg-primary group-hover:bg-accent transition-colors shadow-lg shadow-primary/20" />
                        <div>
                          <h4 className="font-semibold text-primary/60 text-[10px] uppercase tracking-wider mb-1">
                            Phase {i + 1}
                          </h4>
                          <p className="text-foreground/90 bg-background/50 p-4 rounded-lg border border-white/5 group-hover:border-primary/40 transition-colors leading-relaxed">
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
                    <pre className="relative p-6 rounded-xl bg-black/80 border border-white/10 font-mono text-sm text-primary-foreground overflow-x-auto">
                      <code className="text-primary-foreground">{idea.folderStructure}</code>
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
        <span className="font-medium">{label}</span>
      </div>
    </TabsTrigger>
  );
}
