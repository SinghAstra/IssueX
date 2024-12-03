import { Card } from "@/components/ui/card";
import { IssueStatus, IssueType } from "@prisma/client";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Issue {
  status: IssueStatus;
  issueType: IssueType;
}

interface RepositoryAnalyticsProps {
  issues: Issue[];
}

export function RepositoryAnalytics({ issues }: RepositoryAnalyticsProps) {
  const statusData = [
    {
      name: "Open",
      value: issues.filter((i) => i.status === "OPEN").length,
    },
    {
      name: "Closed",
      value: issues.filter((i) => i.status === "CLOSED").length,
    },
  ];

  const typeData = Object.values(IssueType).map((type) => ({
    name: type,
    count: issues.filter((i) => i.issueType === type).length,
  }));

  const COLORS = [
    "hsl(var(--stats-blue))",
    "hsl(var(--stats-purple))",
    "hsl(var(--stats-orange))",
    "hsl(var(--stats-green))",
  ];

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Issues by Status</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Issues by Type</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={typeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="count">
                {typeData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
