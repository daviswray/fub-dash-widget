import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  ExternalLink,
  FileText,
  ClipboardList,
  Users,
  UsersRound,
  BarChart3,
  RefreshCw,
  Settings,
  User,
  LogOut,
  X,
  Menu
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    id: "quick-access",
    label: "Quick Access",
    icon: ExternalLink,
    path: "/quick-access",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: FileText,
    path: "/transactions",
  },
  {
    id: "forms",
    label: "Forms Management",
    icon: ClipboardList,
    path: "/forms",
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    path: "/team",
  },
  {
    id: "clients",
    label: "Clients",
    icon: UsersRound,
    path: "/clients",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
];

const integrationItems = [
  {
    id: "followupboss",
    label: "FollowUpBoss",
    icon: RefreshCw,
    path: "/followupboss",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export function Sidebar({ isOpen, onToggle, onClose }: SidebarProps) {
  const [location] = useLocation();

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 fixed inset-y-0 left-0 z-50 transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        data-testid="sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-foreground">RealEstate Hub</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-muted-foreground hover:text-foreground"
              data-testid="button-close-sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  data-testid={`nav-${item.id}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Integration Tools Section */}
            <div className="pt-6">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Integration Tools
              </h3>
              {integrationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.path);
                
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    data-testid={`nav-${item.id}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <User className="text-accent-foreground h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Agent</p>
                <p className="text-xs text-muted-foreground truncate">Senior Real Estate Agent</p>
              </div>
              <button
                className="text-muted-foreground hover:text-foreground"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
