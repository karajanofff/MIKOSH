import { Activity, Bot, CheckCircle2, ClipboardList, GraduationCap, Star, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartBox from "../components/ChartBox";
import StatCard from "../components/StatCard";
import { aiResults, gradeData, stats, weeklyData } from "../data/demoData";

const icons = [GraduationCap, ClipboardList, CheckCircle2, Star, Bot, Activity];
const colors = ["#0ea5e9", "#8b5cf6", "#10b981"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item, index) => <StatCard key={item.title} {...item} icon={icons[index]} />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartBox title="Háptelik tapsırma tapsırıw grafikası">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="tapsırma" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="tekseriw" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Studentlerdiń bahalaw dárejesi">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="student" fill="#0ea5e9" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="AI tekseriw nátiyjeleri">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={aiResults} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                {aiResults.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
        <section className="glass rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 p-3 text-white"><TrendingUp size={24} /></div>
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">Oqıw nátiyjesi</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Kásiplik pánler boyınsha házirgi kórsetkish</p>
            </div>
          </div>
          {["Ámeliy jumıslar", "AI tekseriw", "Student aktivligi", "Metodikalıq járdem"].map((label, index) => (
            <div key={label} className="mb-4">
              <div className="mb-2 flex justify-between text-sm font-bold text-slate-600 dark:text-slate-300">
                <span>{label}</span><span>{[88, 92, 79, 86][index]}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600" style={{ width: `${[88, 92, 79, 86][index]}%` }} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

