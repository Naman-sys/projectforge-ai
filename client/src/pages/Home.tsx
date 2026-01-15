import { useState } from "react";
import { useGenerateIdea } from "@/hooks/use-generator";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ResultCard";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, BrainCircuit, Code2, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { IdeaInput } from "@shared/schema";

// Options defined in schema
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DOMAINS = ["AIML", "Web Dev", "Data Science", "Cyber Security", "App Dev"];
const LANGUAGES = ["Python", "Java", "JavaScript", "C++"];
const PROJECT_TYPES = ["Mini Project", "Major Project", "Startup Idea"];

export default function Home() {
  const { toast } = useToast();
  const generate = useGenerateIdea();
  
  const [formData, setFormData] = useState<IdeaInput>({
    skillLevel: "Intermediate",
    domain: "Web Dev",
    language: "JavaScript",
    projectType: "Mini Project",
  });

  const handleGenerate = () => {
    generate.mutate(formData, {
      onError: (error) => {
        toast({
          title: "Generation Failed",
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Success!",
          description: "Your project idea is ready.",
          className: "bg-primary text-primary-foreground border-none",
        });
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-background">
      
      {/* LEFT SIDE - Form */}
      <div className="w-full md:w-[450px] lg:w-[500px] shrink-0 h-auto md:h-screen overflow-y-auto p-6 lg:p-10 border-r border-white/5 bg-background/50 backdrop-blur-sm z-10 relative flex flex-col">
        
        {/* Brand Header */}
        <div className="mb-10 pt-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              ProjectForge AI
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Generate production-ready project ideas tailored to your tech stack and skill level.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-8 flex-1">
          <div className="space-y-6">
            <SelectField
              label="Skill Level"
              value={formData.skillLevel}
              onValueChange={(val) => setFormData(prev => ({ ...prev, skillLevel: val as any }))}
              options={SKILL_LEVELS}
              disabled={generate.isPending}
            />
            
            <SelectField
              label="Target Domain"
              value={formData.domain}
              onValueChange={(val) => setFormData(prev => ({ ...prev, domain: val as any }))}
              options={DOMAINS}
              disabled={generate.isPending}
            />

            <SelectField
              label="Primary Language"
              value={formData.language}
              onValueChange={(val) => setFormData(prev => ({ ...prev, language: val as any }))}
              options={LANGUAGES}
              disabled={generate.isPending}
            />

            <SelectField
              label="Project Type"
              value={formData.projectType}
              onValueChange={(val) => setFormData(prev => ({ ...prev, projectType: val as any }))}
              options={PROJECT_TYPES}
              disabled={generate.isPending}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={generate.isPending}
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl shadow-primary/20 transition-all duration-300 rounded-xl group relative overflow-hidden"
          >
            {generate.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Crafting Idea...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Generate Idea</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center md:text-left">
          <p className="text-xs text-muted-foreground/50 font-mono">
            POWERED BY ADVANCED LLMS • V1.0.0
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Display Area */}
      <div className="flex-1 h-screen relative bg-grid-white/[0.02]">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 p-20 opacity-20 blur-3xl rounded-full bg-primary pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-32 opacity-10 blur-3xl rounded-full bg-accent pointer-events-none" />

        <div className="h-full w-full p-4 md:p-8 lg:p-12 overflow-hidden flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!generate.data && !generate.isPending ? (
              // Empty State
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center max-w-lg mx-auto"
              >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl backdrop-blur-sm animate-pulse-slow">
                  <Code2 className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Build Something?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Select your preferences on the left and hit generate. We'll craft a unique project idea complete with architecture, roadmap, and tech stack recommendations.
                </p>
              </motion.div>
            ) : generate.isPending ? (
              // Loading State
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                  <div className="absolute inset-2 rounded-full border-r-2 border-accent animate-spin animation-delay-200" />
                  <div className="absolute inset-4 rounded-full border-b-2 border-primary animate-spin animation-delay-500" />
                </div>
                <h3 className="text-xl font-medium text-foreground animate-pulse">
                  Analyzing Tech Stack...
                </h3>
                <p className="text-muted-foreground mt-2">
                  Designing architecture & features
                </p>
              </motion.div>
            ) : (
              // Result Card
              <div className="h-full max-w-5xl mx-auto w-full">
                <ResultCard idea={generate.data!} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
