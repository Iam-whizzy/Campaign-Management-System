import React from "react";
import { 
  Vote, 
  HelpCircle, 
  Plus, 
  Calendar, 
  CheckSquare, 
  AlertCircle, 
  UserPlus, 
  ChevronDown,
  Sparkles
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

interface HeaderProps {
  onOpenTestGuide: () => void;
  onOpenAddActivity: () => void;
  onOpenAddTask: () => void;
  onOpenAddIssue: () => void;
  onOpenAddTeam: () => void;
  countyName: string;
  candidateName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTestGuide,
  onOpenAddActivity,
  onOpenAddTask,
  onOpenAddIssue,
  onOpenAddTeam,
  countyName,
  candidateName,
}) => {
  const [quickAddOpen, setQuickAddOpen] = React.useState(false);

  // Close quick add on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#quick-add-container")) {
        setQuickAddOpen(false);
      }
    };
    if (quickAddOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [quickAddOpen]);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950 text-white border-b border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Campaign Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black shadow-inner shrink-0">
            <Vote className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white truncate">
                County Campaign Manager
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Training Prototype
              </span>
            </div>
            <p className="text-xs text-zinc-400 truncate">
              {countyName} • <span className="text-zinc-300 font-medium">{candidateName}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick "How to Test" button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenTestGuide}
            className="border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 hover:text-white text-xs h-8 px-2.5 sm:px-3 font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400 sm:mr-1.5" />
            <span className="hidden sm:inline">How to Test</span>
          </Button>

          {/* Quick Add Menu */}
          <div id="quick-add-container" className="relative">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => setQuickAddOpen(!quickAddOpen)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-8 px-3 gap-1 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Quick Add</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
            </Button>

            {quickAddOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white text-zinc-900 shadow-xl border border-zinc-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
                  New Campaign Record
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddOpen(false);
                    onOpenAddActivity();
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-zinc-50 font-medium text-zinc-800 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Schedule Activity / Rally</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddOpen(false);
                    onOpenAddTask();
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-zinc-50 font-medium text-zinc-800 cursor-pointer"
                >
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>Assign Campaign Task</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddOpen(false);
                    onOpenAddIssue();
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-zinc-50 font-medium text-zinc-800 cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Log Community Issue</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickAddOpen(false);
                    onOpenAddTeam();
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 hover:bg-zinc-50 font-medium text-zinc-800 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-zinc-700" />
                  <span>Add Team Member</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
