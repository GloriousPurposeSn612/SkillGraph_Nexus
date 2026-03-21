import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onSkillsExtracted: (skills: string[]) => void;
}

const MOCK_SKILL_SETS = [
  ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS'],
  ['JavaScript', 'HTML', 'CSS', 'React', 'GraphQL', 'MongoDB', 'Firebase'],
  ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'SQL', 'Statistics'],
  ['Java', 'Spring Boot', 'Microservices', 'Kubernetes', 'CI/CD', 'PostgreSQL'],
];

export default function ResumeUpload({ onSkillsExtracted }: Props) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    setFileName(file.name);

    try {
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        // Continue with mock parsing anyway for demo
      }

      const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(filePath);

      await supabase.from('resumes').insert({
        user_id: user.id,
        file_url: urlData?.publicUrl || filePath,
        file_name: file.name,
        upload_date: new Date().toISOString(),
      });

      // Mock skill extraction
      const skills = MOCK_SKILL_SETS[Math.floor(Math.random() * MOCK_SKILL_SETS.length)];
      onSkillsExtracted(skills);

      // Award XP
      await supabase.from('profiles').update({ xp: Math.floor(Math.random() * 50) + 50 }).eq('id', user.id);

      setUploaded(true);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass rounded-xl p-6 glow-border">
      <h3 className="font-display text-lg text-primary mb-4">Resume Upload</h3>
      <AnimatePresence mode="wait">
        {uploaded ? (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
            <p className="text-foreground font-medium">{fileName}</p>
            <p className="text-muted-foreground text-sm mt-1">Skills extracted successfully!</p>
            <Button variant="outline" className="mt-4 border-primary/30 text-primary hover:bg-primary/10" onClick={() => setUploaded(false)}>
              Upload Another
            </Button>
          </motion.div>
        ) : (
          <motion.label key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
            {uploading ? (
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Processing...</p>
              </div>
            ) : (
              <>
                <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-foreground font-medium">Drop your resume here</p>
                <p className="text-muted-foreground text-sm mt-1">PDF format recommended</p>
              </>
            )}
            <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleUpload} />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
}
