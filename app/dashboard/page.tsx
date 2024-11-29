"use client";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Stats Overview */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Repositories"
          value={mockStats.totalRepositories}
          icon={<Icons.gitLogo className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
          description="Active GitHub repositories connected"
          variant="blue"
        />
        <StatsCard
          title="Active Repositories"
          value={mockStats.activeRepositories}
          icon={<Icons.gitBranch className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
          description="Repositories with recent activity"
          variant="purple"
        />
        <StatsCard
          title="Open Issues"
          value={mockStats.openIssues}
          icon={<Icons.gitBug className="h-5 w-5" />}
          trend={{ value: 5, isPositive: false }}
          description="Issues requiring attention"
          variant="orange"
        />
        <StatsCard
          title="AI Analyzed"
          value={`${(
            (mockStats.aiAnalyzedIssues / mockStats.totalIssues) *
            100
          ).toFixed(0)}%`}
          icon={<Icons.activityLog className="h-5 w-5" />}
          description="Issues processed by AI"
          variant="green"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Connected Repositories</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRepositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      </div>

      <RecentIssues issues={mockIssues} /> */}
    </div>
  );
}
