import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Zap, LayoutDashboard, Upload, BrainCircuit, Target, Trophy, User, LogOut, Calendar } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Resume', path: '/dashboard/resume' },
  { icon: BrainCircuit, label: 'Job Analyzer', path: '/dashboard/analyzer' },
  { icon: Target, label: 'Missions', path: '/dashboard/missions' },
  { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
  { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

export default function DashboardSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen glass border-r border-border/50 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-border/50">
        <Zap className="w-7 h-7 text-primary" />
        <span className="font-display font-bold text-primary text-lg glow-text">NEXUS</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-primary/10 text-primary glow-border'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border/50">
        <button
          onClick={() => { signOut(); navigate('/login'); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
