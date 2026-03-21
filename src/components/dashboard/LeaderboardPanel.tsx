import { Trophy, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LEADERBOARD = [
  { rank: 1, username: 'CyberNinja', xp: 2450 },
  { rank: 2, username: 'DataWizard', xp: 2100 },
  { rank: 3, username: 'CodePhoenix', xp: 1850 },
  { rank: 4, username: 'PixelHacker', xp: 1600 },
  { rank: 5, username: 'NeuralKnight', xp: 1400 },
  { rank: 6, username: 'ByteStorm', xp: 1200 },
  { rank: 7, username: 'QuantumDev', xp: 980 },
  { rank: 8, username: 'VectorPilot', xp: 750 },
];

const rankColors: Record<number, string> = {
  1: 'text-yellow-400',
  2: 'text-gray-300',
  3: 'text-orange-400',
};

export default function LeaderboardPanel() {
  return (
    <div className="glass rounded-xl p-6 glow-border">
      <h3 className="font-display text-lg text-primary mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5" /> Leaderboard
      </h3>
      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((entry, i) => (
          <motion.div key={entry.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className={`flex items-center justify-between p-3 rounded-lg ${entry.rank <= 3 ? 'bg-primary/5 border border-primary/10' : 'bg-muted/20'}`}>
            <div className="flex items-center gap-3">
              <span className={`font-display font-bold text-lg w-8 ${rankColors[entry.rank] || 'text-muted-foreground'}`}>
                {entry.rank <= 3 ? <Medal className={`w-5 h-5 ${rankColors[entry.rank]}`} /> : `#${entry.rank}`}
              </span>
              <span className="text-sm font-medium text-foreground">{entry.username}</span>
            </div>
            <span className="font-display text-sm text-primary">{entry.xp} XP</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
