import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface Mission {
  id: string;
  title: string;
  progress: number;
  deadline: string;
}

const INITIAL_MISSIONS: Mission[] = [
  { id: '1', title: 'Learn React Basics', progress: 75, deadline: '2025-02-01' },
  { id: '2', title: 'Practice DSA Daily', progress: 40, deadline: '2025-03-01' },
  { id: '3', title: 'Build Portfolio Project', progress: 20, deadline: '2025-04-01' },
];

export default function MissionsPanel() {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [newTitle, setNewTitle] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const addMission = () => {
    if (!newTitle.trim()) return;
    setMissions(prev => [...prev, {
      id: Date.now().toString(), title: newTitle, progress: 0,
      deadline: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    }]);
    setNewTitle('');
    setShowAdd(false);
  };

  const updateProgress = (id: string, delta: number) => {
    setMissions(prev => prev.map(m =>
      m.id === id ? { ...m, progress: Math.min(100, Math.max(0, m.progress + delta)) } : m
    ));
  };

  return (
    <div className="glass rounded-xl p-6 glow-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-primary flex items-center gap-2">
          <Target className="w-5 h-5" /> Missions
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setShowAdd(!showAdd)} className="text-primary hover:bg-primary/10">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {showAdd && (
        <div className="flex gap-2 mb-4">
          <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="New mission..."
            className="bg-muted/50 border-border focus:border-primary" />
          <Button onClick={addMission} className="bg-primary text-primary-foreground hover:bg-primary/80">Add</Button>
        </div>
      )}

      <div className="space-y-4">
        {missions.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-muted/20 rounded-lg p-4 border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium text-sm ${m.progress >= 100 ? 'text-primary line-through' : 'text-foreground'}`}>
                {m.progress >= 100 && <CheckCircle className="w-4 h-4 inline mr-1 text-primary" />}
                {m.title}
              </span>
              <span className="text-xs text-muted-foreground">{m.progress}%</span>
            </div>
            <Progress value={m.progress} className="h-2 bg-muted mb-2" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Due: {m.deadline}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => updateProgress(m.id, -10)} className="h-6 text-xs text-muted-foreground hover:text-foreground">-10</Button>
                <Button variant="ghost" size="sm" onClick={() => updateProgress(m.id, 10)} className="h-6 text-xs text-primary hover:bg-primary/10">+10</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
