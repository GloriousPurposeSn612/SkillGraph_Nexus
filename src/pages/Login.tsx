import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Zap, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 glass rounded-xl glow-border"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Zap className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold text-primary glow-text">SKILLGRAPH NEXUS</h1>
        </div>
        <h2 className="text-xl font-display text-center mb-6 text-foreground">Sign In</h2>
        {error && <p className="text-destructive text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
            className="bg-muted/50 border-border focus:border-primary"
          />
          <Input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required
            className="bg-muted/50 border-border focus:border-primary"
          />
          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-display">
            <LogIn className="w-4 h-4 mr-2" />{loading ? 'Signing in...' : 'Enter the Nexus'}
          </Button>
        </form>
        <p className="text-center text-muted-foreground text-sm mt-6">
          No account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
