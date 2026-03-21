import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisResult {
  required_skills: string[];
  recommended_skills: string[];
  experience_level: string;
}

interface Props {
  onAnalysis: (result: AnalysisResult) => void;
}

export default function JobAnalyzer({ onAnalysis }: Props) {
  const [jd, setJd] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = async () => {
    setAnalyzing(true);
    // Mock AI analysis
    await new Promise(r => setTimeout(r, 1500));
    const keywords = jd.toLowerCase();
    const required: string[] = [];
    const recommended: string[] = [];

    const skillMap: Record<string, string[]> = {
      react: ['React'], typescript: ['TypeScript'], python: ['Python'], java: ['Java'],
      node: ['Node.js'], sql: ['SQL'], aws: ['AWS'], docker: ['Docker'],
      kubernetes: ['Kubernetes'], graphql: ['GraphQL'], machine: ['Machine Learning'],
      data: ['Data Analysis'], api: ['REST APIs'], git: ['Git'], agile: ['Agile'],
      javascript: ['JavaScript'], css: ['CSS'], html: ['HTML'],
    };

    Object.entries(skillMap).forEach(([key, skills]) => {
      if (keywords.includes(key)) required.push(...skills);
    });

    if (required.length < 3) {
      required.push('Communication', 'Problem Solving', 'Teamwork');
    }
    recommended.push('System Design', 'CI/CD', 'Testing');

    const level = keywords.includes('senior') ? 'Senior' : keywords.includes('junior') ? 'Junior' : 'Mid-Level';

    const res = { required_skills: [...new Set(required)], recommended_skills: recommended, experience_level: level };
    setResult(res);
    onAnalysis(res);
    setAnalyzing(false);
  };

  return (
    <div className="glass rounded-xl p-6 glow-border">
      <h3 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
        <BrainCircuit className="w-5 h-5" /> Job Description Analyzer
      </h3>
      <Textarea
        placeholder="Paste a job description here..."
        value={jd} onChange={e => setJd(e.target.value)}
        className="bg-muted/50 border-border min-h-[120px] mb-4 focus:border-primary"
      />
      <Button onClick={analyze} disabled={!jd.trim() || analyzing} className="bg-primary text-primary-foreground hover:bg-primary/80 font-display">
        <Sparkles className="w-4 h-4 mr-2" />{analyzing ? 'Analyzing...' : 'Analyze with AI'}
      </Button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {result.required_skills.map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Recommended Skills</p>
            <div className="flex flex-wrap gap-2">
              {result.recommended_skills.map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Experience Level:</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">{result.experience_level}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
