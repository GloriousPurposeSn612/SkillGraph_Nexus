import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Save, Star, Award, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ username: '', bio: '', target_role: '', skills: '', xp: 0, level: 1, streak: 0 });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
      if (data) setProfile({
        username: data.username || '',
        bio: data.bio || '',
        target_role: data.target_role || '',
        skills: data.skills || '',
        xp: data.xp || 0,
        level: data.level || 1,
        streak: data.streak || 0,
      });
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      username: profile.username,
      bio: profile.bio,
      target_role: profile.target_role,
      skills: profile.skills,
      email: user.email,
    });
    if (error) toast.error('Failed to save profile');
    else toast.success('Profile updated!');
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
      <h2 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
        <User className="w-6 h-6" /> Profile
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Star, label: 'XP', value: profile.xp },
          { icon: Award, label: 'Level', value: profile.level },
          { icon: Flame, label: 'Streak', value: profile.streak },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center glow-border">
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-1" />
            <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-6 glow-border space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Username</label>
          <Input value={profile.username} onChange={e => setProfile(p => ({ ...p, username: e.target.value }))}
            className="bg-muted/50 border-border focus:border-primary" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Bio</label>
          <Textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
            className="bg-muted/50 border-border focus:border-primary" placeholder="Tell us about yourself..." />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Target Job Role</label>
          <Input value={profile.target_role} onChange={e => setProfile(p => ({ ...p, target_role: e.target.value }))}
            className="bg-muted/50 border-border focus:border-primary" placeholder="e.g. Full Stack Developer" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Skills (comma-separated)</label>
          <Input value={profile.skills} onChange={e => setProfile(p => ({ ...p, skills: e.target.value }))}
            className="bg-muted/50 border-border focus:border-primary" placeholder="React, Python, SQL..." />
        </div>
        <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/80 font-display">
          <Save className="w-4 h-4 mr-2" />{saving ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </motion.div>
  );
}
