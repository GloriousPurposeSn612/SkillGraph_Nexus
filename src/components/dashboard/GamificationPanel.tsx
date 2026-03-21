import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Props {
  xp: number;
  level: number;
  streak: number;
}

const BADGES = [
  { name: 'First Upload', icon: '📄', earned: true },
  { name: 'Skill Seeker', icon: '🔍', earned: true },
  { name: 'Streak Master', icon: '🔥', earned: false },
  { name: 'Top 10', icon: '🏆', earned: false },
  { name: 'AI Explorer', icon: '🤖', earned: true },
  { name: 'Goal Crusher', icon: '🎯', earned: false },
];

export default function GamificationPanel({ xp, level, streak }: Props) {
  const xpForNext = level * 200;
  const progress = Math.min((xp / xpForNext) * 100, 100);

  return (
    <div className="glass rounded-xl p-6 glow-border">
      <h3 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5" /> Your Stats
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Star className="w-6 h-6 text-primary mx-auto mb-1" />
          <p className="text-2xl font-display font-bold text-foreground">{xp}</p>
          <p className="text-xs text-muted-foreground">XP</p>
        </div>
        <div className="text-center">
          <Award className="w-6 h-6 text-secondary mx-auto mb-1" />
          <p className="text-2xl font-display font-bold text-foreground">{level}</p>
          <p className="text-xs text-muted-foreground">Level</p>
        </div>
        <div className="text-center">
          <Flame className="w-6 h-6 text-accent mx-auto mb-1" />
          <p className="text-2xl font-display font-bold text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">Streak</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Level {level}</span>
          <span>{xp}/{xpForNext} XP</span>
        </div>
        <Progress value={progress} className="h-2 bg-muted" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Badges</p>
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map(badge => (
            <motion.div key={badge.name} whileHover={{ scale: 1.05 }}
              className={`text-center p-3 rounded-lg border ${badge.earned ? 'border-primary/30 bg-primary/5' : 'border-border/30 bg-muted/20 opacity-40'}`}>
              <span className="text-2xl">{badge.icon}</span>
              <p className="text-[10px] text-muted-foreground mt-1">{badge.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
