import React from "react";
import { 
  LayoutDashboard, 
  CalendarDays, 
  CheckSquare, 
  AlertTriangle, 
  Users 
} from "lucide-react";
import { NavTab } from "./Sidebar";
import { cn } from "../../lib/utils";

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingTasksCount: number;
  urgentIssuesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  pendingTasksCount,
  urgentIssuesCount,
}) => {
  const tabs = [
    {
      id: "dashboard" as NavTab,
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "activities" as NavTab,
      label: "Activities",
      icon: CalendarDays,
      badge: null,
    },
    {
      id: "tasks" as NavTab,
      label: "Tasks",
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
    },
    {
      id: "issues" as NavTab,
      label: "Issues",
      icon: AlertTriangle,
      badge: urgentIssuesCount > 0 ? urgentIssuesCount : null,
    },
    {
      id: "team" as NavTab,
      label: "Team",
      icon: Users,
      badge: null,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950 text-white border-t border-zinc-800 pb-safe shadow-lg">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-1 transition-all cursor-pointer",
                isActive
                  ? "text-emerald-400 font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {/* Active top line */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-500 rounded-b-full shadow-xs" />
              )}
              <div className="relative">
                <Icon className={cn("w-5 h-5", isActive ? "text-emerald-400 scale-110" : "text-zinc-400")} />
                {tab.badge !== null && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-zinc-950 text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
