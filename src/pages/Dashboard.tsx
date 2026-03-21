import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import SkillRadarChart from '@/components/dashboard/SkillRadarChart';
import ResumeUpload from '@/components/dashboard/ResumeUpload';
import JobAnalyzer from '@/components/dashboard/JobAnalyzer';
import SkillGapAnalysis from '@/components/dashboard/SkillGapAnalysis';
import GamificationPanel from '@/components/dashboard/GamificationPanel';
import MissionsPanel from '@/components/dashboard/MissionsPanel';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import LeaderboardPanel from '@/components/dashboard/LeaderboardPanel';
import ProfilePage from '@/pages/Profile';
import { motion } from 'framer-motion';

function DashboardHome() {
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [jobRequired, setJobRequired] = useState<string[]>([]);

  const userSkillMap: Record<string, number> = {};
  userSkills.forEach(s => { userSkillMap[s] = Math.floor(Math.random() * 40) + 50; });

  const jobSkillMap: Record<string, number> = {};
  jobRequired.forEach(s => { jobSkillMap[s] = Math.floor(Math.random() * 30) + 60; });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-primary glow-text">Command Center</h1>
        <p className="text-muted-foreground mt-1">Your AI-powered career intelligence hub</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SkillRadarChart userSkills={userSkillMap} jobSkills={jobSkillMap} />
          <JobAnalyzer onAnalysis={r => setJobRequired(r.required_skills)} />
          <SkillGapAnalysis userSkills={userSkills} jobRequired={jobRequired} />
        </div>
        <div className="space-y-6">
          <GamificationPanel xp={320} level={2} streak={5} />
          <ResumeUpload onSkillsExtracted={setUserSkills} />
          <CalendarWidget />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8 overflow-auto cyber-grid">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="resume" element={<div className="max-w-2xl"><ResumeUpload onSkillsExtracted={() => {}} /></div>} />
            <Route path="analyzer" element={<div className="max-w-2xl"><JobAnalyzer onAnalysis={() => {}} /></div>} />
            <Route path="missions" element={<MissionsPanel />} />
            <Route path="calendar" element={<CalendarWidget />} />
            <Route path="leaderboard" element={<LeaderboardPanel />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
