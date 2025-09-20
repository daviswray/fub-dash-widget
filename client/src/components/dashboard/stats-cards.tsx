import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, ClipboardCheck, Users, DollarSign } from "lucide-react";

export function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsConfig = [
    {
      title: "Active Transactions",
      value: (stats as any)?.activeTransactions || 0,
      icon: Handshake,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      change: "+12% from last month",
      testId: "stat-active-transactions",
    },
    {
      title: "Pending Forms",
      value: (stats as any)?.pendingForms || 0,
      icon: ClipboardCheck,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      change: "3 due today",
      testId: "stat-pending-forms",
    },
    {
      title: "Team Members",
      value: (stats as any)?.teamMembers || 0,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "2 online now",
      testId: "stat-team-members",
    },
    {
      title: "Monthly Revenue",
      value: (stats as any)?.monthlyRevenue || "$0",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      change: "+8% from last month",
      testId: "stat-monthly-revenue",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow" data-testid={stat.testId}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-accent text-sm font-medium">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
