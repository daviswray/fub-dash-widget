import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function RecentActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["/api/activities"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return Plus;
      case "form":
        return FileText;
      case "inspection":
        return CheckCircle;
      default:
        return Plus;
    }
  };

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case "transaction":
        return "text-accent";
      case "form":
        return "text-blue-600";
      case "inspection":
        return "text-green-600";
      default:
        return "text-accent";
    }
  };

  const getActivityIconBg = (type: string) => {
    switch (type) {
      case "transaction":
        return "bg-accent/10";
      case "form":
        return "bg-blue-100";
      case "inspection":
        return "bg-green-100";
      default:
        return "bg-accent/10";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <Button variant="outline" size="sm" data-testid="button-view-all-activities">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {(activities as any)?.slice(0, 3).map((activity: any) => {
            const Icon = getActivityIcon(activity.type);
            const iconColor = getActivityIconColor(activity.type);
            const iconBg = getActivityIconBg(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start space-x-3" data-testid={`activity-${activity.id}`}>
                <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
