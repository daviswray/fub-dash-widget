import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { TeamForms } from "@/components/dashboard/team-forms";
import { TeamPerformance } from "@/components/dashboard/team-performance";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        onClose={handleSidebarClose}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={handleSidebarToggle} />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Stats Cards */}
          <StatsCards />

          {/* Quick Access and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickAccess />
            <RecentActivity />
          </div>

          {/* Team Transaction Forms Management */}
          <TeamForms />

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamPerformance />
            <UpcomingTasks />
          </div>
        </main>
      </div>
    </div>
  );
}
