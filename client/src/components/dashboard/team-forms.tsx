import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Filter, Plus, File, ClipboardCheck, Home } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export function TeamForms() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: forms, isLoading } = useQuery({
    queryKey: ["/api/forms"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/forms/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/forms"] });
      toast({ title: "Form status updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update form status", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Transaction Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse border border-border rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getFormIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "purchase agreement":
        return File;
      case "inspection report":
        return ClipboardCheck;
      case "listing agreement":
        return Home;
      default:
        return File;
    }
  };

  const getFormIconColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "purchase agreement":
        return "text-primary";
      case "inspection report":
        return "text-accent";
      case "listing agreement":
        return "text-blue-600";
      default:
        return "text-primary";
    }
  };

  const getStatusVariant = (status: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default";
      case "overdue":
        return "destructive";
      case "pending review":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "pending review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewForm = (formId: string) => {
    console.log("View form:", formId);
    toast({ title: "Opening form details..." });
  };

  const handleEditForm = (formId: string) => {
    console.log("Edit form:", formId);
    toast({ title: "Opening form editor..." });
  };

  const handleUrgentForm = (formId: string) => {
    updateStatusMutation.mutate({ id: formId, status: "Urgent" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Team Transaction Forms</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" data-testid="button-filter-forms">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" data-testid="button-new-form">
            <Plus className="h-4 w-4 mr-2" />
            New Form
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Form Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Property</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Agent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(forms as any)?.map((form: any) => {
                const Icon = getFormIcon(form.type);
                const iconColor = getFormIconColor(form.type);
                const isOverdue = form.status === "Overdue";
                
                return (
                  <tr key={form.id} className="hover:bg-muted/50" data-testid={`form-row-${form.id}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                        <span className="text-sm text-foreground">{form.type}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-foreground">{form.propertyAddress}</p>
                        <p className="text-xs text-muted-foreground">{form.propertyCity}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                            {form.agent?.initials || "??"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-foreground">{form.agent?.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={getStatusVariant(form.status)}
                        className={getStatusColor(form.status)}
                      >
                        {form.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${isOverdue ? "text-red-600" : "text-foreground"}`}>
                        {format(new Date(form.dueDate), "MMM dd, yyyy")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleViewForm(form.id)}
                          data-testid={`button-view-form-${form.id}`}
                        >
                          View
                        </Button>
                        {form.status !== "Completed" && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleEditForm(form.id)}
                            data-testid={`button-edit-form-${form.id}`}
                          >
                            Edit
                          </Button>
                        )}
                        {isOverdue && (
                          <Button
                            variant="link"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleUrgentForm(form.id)}
                            data-testid={`button-urgent-form-${form.id}`}
                          >
                            Urgent
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
