import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export function UpcomingTasks() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["/api/tasks"],
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: number }) => {
      const response = await apiRequest("PATCH", `/api/tasks/${id}/status`, { completed });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({ title: "Task updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update task", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse border border-border rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-muted rounded mt-1"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPriorityVariant = (priority: string): "default" | "destructive" | "secondary" => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    updateTaskMutation.mutate({ id: taskId, completed: completed ? 1 : 0 });
  };

  const formatDueDate = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const taskDate = new Date(due.getFullYear(), due.getMonth(), due.getDate());

    if (taskDate.getTime() === today.getTime()) {
      return `Due Today, ${format(due, "h:mm a")}`;
    } else if (taskDate.getTime() === tomorrow.getTime()) {
      return `Tomorrow, ${format(due, "h:mm a")}`;
    } else {
      return format(due, "MMM dd, yyyy");
    }
  };

  const upcomingTasks = (tasks as any)?.filter((task: any) => !task.completed);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
        <Button variant="outline" size="sm" data-testid="button-view-all-tasks">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTasks?.slice(0, 3).map((task: any) => (
            <div
              key={task.id}
              className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              data-testid={`task-${task.id}`}
            >
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed === 1}
                onCheckedChange={(checked) => handleTaskToggle(task.id, checked as boolean)}
                className="mt-1"
                data-testid={`checkbox-task-${task.id}`}
              />
              <div className="flex-1 min-w-0">
                <label htmlFor={`task-${task.id}`} className="text-sm text-foreground cursor-pointer">
                  {task.title}
                </label>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDueDate(task.dueDate)}
                  </span>
                  <Badge
                    variant={getPriorityVariant(task.priority)}
                    className={`text-xs ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
