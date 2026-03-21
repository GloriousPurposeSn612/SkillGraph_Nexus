import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  userSkills: Record<string, number>;
  jobSkills: Record<string, number>;
}

export default function SkillRadarChart({ userSkills, jobSkills }: Props) {
  const allSkills = [...new Set([...Object.keys(userSkills), ...Object.keys(jobSkills)])];
  const data = allSkills.map(skill => ({
    skill,
    'Your Skills': userSkills[skill] || 0,
    'Required Skills': jobSkills[skill] || 0,
  }));

  return (
    <div className="glass rounded-xl p-6 glow-border">
      <h3 className="font-display text-lg text-primary mb-4">Skill Graph</h3>
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-12">Upload a resume and analyze a job to see your skill graph</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={data}>
            <PolarGrid stroke="hsl(220 15% 18%)" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: 'hsl(200 20% 70%)', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(220 10% 50%)' }} />
            <Radar name="Your Skills" dataKey="Your Skills" stroke="hsl(180 100% 50%)" fill="hsl(180 100% 50%)" fillOpacity={0.2} strokeWidth={2} />
            <Radar name="Required Skills" dataKey="Required Skills" stroke="hsl(320 80% 55%)" fill="hsl(320 80% 55%)" fillOpacity={0.15} strokeWidth={2} />
            <Legend wrapperStyle={{ color: 'hsl(200 20% 70%)' }} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
