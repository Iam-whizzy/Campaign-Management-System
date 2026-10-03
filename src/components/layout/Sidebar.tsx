import React from "react";
import { 
  LayoutDashboard, 
  CalendarDays, 
  CheckSquare, 
  AlertTriangle, 
  Users, 
  Flag,
  Target,
  FileText,
  RotateCcw
} from "lucide-react";
import { cn } from "../../lib/utils";

export type NavTab = "dashboard" | "activities" | "tasks" | "issues" | "team";

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingTasksCount: number;
  urgentIssuesCount: number;
  activitiesCount: number;
  teamCount: number;
  onOpenTestGuide: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingTasksCount,
  urgentIssuesCount,
  activitiesCount,
  teamCount,
  onOpenTestGuide,
}) => {
  const navItems = [
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
      badge: activitiesCount > 0 ? activitiesCount : null,
      badgeColor: "bg-zinc-200 text-zinc-800",
    },
    {
      id: "tasks" as NavTab,
      label: "Tasks",
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : null,
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      id: "issues" as NavTab,
      label: "Community Issues",
      icon: AlertTriangle,
      badge: urgentIssuesCount > 0 ? urgentIssuesCount : null,
      badgeColor: "bg-amber-100 text-amber-900",
    },
    {
      id: "team" as NavTab,
      label: "Team",
      icon: Users,
      badge: teamCount > 0 ? teamCount : null,
      badgeColor: "bg-zinc-200 text-zinc-800",
    },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-zinc-200 bg-white p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* Campaign Manifesto Banner */}
        <div className="rounded-xl bg-linear-to-br from-emerald-800 to-zinc-900 p-4 text-white shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <Flag className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Gubernatorial Race
            </span>
          </div>
          <div className="text-sm font-bold leading-tight">2027 County Polls</div>
          <p className="text-[11px] text-zinc-300 mt-1 leading-snug">
            "Uongozi Thabiti, Maendeleo Mashinani"
          </p>
          <div className="mt-3 pt-2.5 border-t border-emerald-700/60 flex items-center justify-between text-[11px]">
            <span className="text-emerald-200">Countdown:</span>
            <span className="font-bold text-white bg-black/30 px-2 py-0.5 rounded">312 Days</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Campaign Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                  isActive
                    ? "bg-emerald-700 text-white shadow-xs font-bold"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-white" : "text-zinc-500"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs rounded-full font-bold",
                      isActive ? "bg-emerald-900 text-white" : item.badgeColor
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer support & training guide */}
      <div className="pt-4 border-t border-zinc-200 space-y-2">
        <button
          type="button"
          onClick={onOpenTestGuide}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 text-emerald-700" />
          <span>Testing Instructions</span>
        </button>

        <div className="text-[11px] text-zinc-400 px-3 text-center">
          County Campaign Manager v1.0
          <div className="text-[10px] text-zinc-400">Fictional Training Prototype</div>
        </div>
      </div>
    </aside>
  );
};
