import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartBox from "../components/ChartBox";
import { monthStats } from "../data/demoData";

export default function Statistics() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ChartBox title="Aylar boyınsha oqıw aktivligi">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="aktivlik" stroke="#0ea5e9" fill="#bae6fd" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartBox>
      <ChartBox title="Studentlerdiń ózlestriw dárejesi">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede9fe" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="ozlestiriw" stroke="#8b5cf6" fill="#ddd6fe" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartBox>
      <ChartBox title="Tapsırmalar orınlanıw procenti">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="aktivlik" fill="#10b981" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
      <ChartBox title="AI járdeminde tekserilgen jumıslar sanı">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ai" fill="#6366f1" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

