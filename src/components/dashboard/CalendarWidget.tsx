import { useState, useMemo } from 'react';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeDays] = useState<Set<string>>(() => {
    const days = new Set<string>();
    const today = new Date();
    // Mock: last 15 random days as active
    for (let i = 0; i < 15; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - Math.floor(Math.random() * 30));
      days.add(d.toISOString().split('T')[0]);
    }
    // Always include today
    days.add(today.toISOString().split('T')[0]);
    return days;
  });

  const streak = useMemo(() => {
    let count = 0;
    const d = new Date();
    while (activeDays.has(d.toISOString().split('T')[0])) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [activeDays]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString('en', { month: 'long', year: 'numeric' });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="glass rounded-xl p-6 glow-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-primary flex items-center gap-2">
          <Flame className="w-5 h-5" /> Streak: {streak} days
        </h3>
      </div>
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="sm" onClick={prev} className="text-muted-foreground hover:text-foreground"><ChevronLeft className="w-4 h-4" /></Button>
        <span className="text-sm font-medium text-foreground">{monthName}</span>
        <Button variant="ghost" size="sm" onClick={next} className="text-muted-foreground hover:text-foreground"><ChevronRight className="w-4 h-4" /></Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <span key={d} className="text-[10px] text-muted-foreground py-1">{d}</span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isActive = activeDays.has(dateStr);
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          return (
            <div key={i} className={`text-xs py-1.5 rounded-md transition-colors ${
              isActive ? 'bg-primary/20 text-primary font-bold' : 'text-muted-foreground'
            } ${isToday ? 'ring-1 ring-primary' : ''}`}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
