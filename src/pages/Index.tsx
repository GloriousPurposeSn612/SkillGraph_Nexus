import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, BrainCircuit, Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 justify-center mb-6">
            <Zap className="w-12 h-12 text-primary animate-pulse-glow" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-primary glow-text mb-4">
            SKILLGRAPH NEXUS
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Bridge the gap between your skills and your dream job with AI-powered analysis, explainable recommendations, and gamified progress tracking.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/signup')} className="bg-primary text-primary-foreground hover:bg-primary/80 font-display px-8 py-6 text-lg">
              Get Started
            </Button>
            <Button onClick={() => navigate('/login')} variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-display px-8 py-6 text-lg">
              Sign In
            </Button>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full">
          {[
            { icon: BrainCircuit, title: 'AI Skill Analysis', desc: 'Explainable AI compares your skills to job requirements with confidence scores' },
            { icon: Target, title: 'Gap Detection', desc: 'Identify missing skills with personalized learning paths and timelines' },
            { icon: Trophy, title: 'Gamified Growth', desc: 'Earn XP, badges, and climb the leaderboard as you close skill gaps' },
          ].map((f, i) => (
            <motion.div key={f.title} whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-xl p-6 glow-border text-left">
              <f.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
