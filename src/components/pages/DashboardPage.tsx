import React from "react";
import { 
  Users, 
  CalendarDays, 
  CheckSquare, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Zap,
  HelpCircle,
  Vote
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Activity, CampaignTask, CommunityIssue, TeamMember } from "../../types/campaign";
import { formatNumber, formatDate } from "../../lib/utils";
import { NavTab } from "../layout/Sidebar";

interface DashboardPageProps {
  activities: Activity[];
  tasks: CampaignTask[];
  issues: CommunityIssue[];
  team: TeamMember[];
  onNavigate: (tab: NavTab) => void;
  onOpenTestGuide: () => void;
  onTriggerScenario: (scenarioType: "rain" | "water" | "youth") => void;
  candidateName: string;
  runningMate: string;
  countyName: string;
  slogan: string;
  targetVoters: number;
  mobilizedVoters: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  activities,
  tasks,
  issues,
  team,
  onNavigate,
  onOpenTestGuide,
  onTriggerScenario,
  candidateName,
  runningMate,
  countyName,
  slogan,
  targetVoters,
  mobilizedVoters,
}) => {
  const percentageMobilized = Math.min(100, Math.round((mobilizedVoters / targetVoters) * 100));

  const upcomingActivities = activities
    .filter((a) => a.status === "Scheduled")
    .slice(0, 3);

  const pendingTasks = tasks.filter((t) => t.status !== "Completed");
  const criticalTasks = pendingTasks.filter((t) => t.priority === "Critical");
  const urgentIssues = issues.filter((i) => i.severity === "Urgent");

  // Sub-county breakdown metrics (fictional realistic model)
  const subCounties = [
    { name: "West Mugirango", target: 95000, mobilized: 58000, color: "bg-emerald-600" },
    { name: "Kitutu Masaba", target: 110000, mobilized: 62000, color: "bg-emerald-700" },
    { name: "North Mugirango", target: 75000, mobilized: 39000, color: "bg-emerald-600" },
    { name: "Borabu", target: 60000, mobilized: 34000, color: "bg-emerald-800" },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Hero Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-emerald-950 text-white p-5 sm:p-7 shadow-md border border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="bg-emerald-600/90 text-white border-none text-[11px]">
                {countyName} 2027 Election
              </Badge>
              <Badge variant="outline" className="border-zinc-700 text-zinc-300 text-[11px] bg-zinc-900/50">
                Official Campaign Dashboard
              </Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {candidateName}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 flex flex-wrap items-center gap-x-2">
              <span>Running Mate: <strong>{runningMate}</strong></span>
              <span className="text-zinc-500">•</span>
              <span className="italic text-emerald-300">"{slogan}"</span>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl self-start md:self-auto">
            <div className="p-2.5 bg-emerald-900/80 text-emerald-400 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-medium">Voter Mobilization Target</div>
              <div className="text-base sm:text-lg font-bold text-white">
                {formatNumber(mobilizedVoters)} <span className="text-xs font-normal text-zinc-400">/ {formatNumber(targetVoters)}</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold">{percentageMobilized}% of Victory Quota reached</div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-xs text-zinc-300">
            <span>Overall County Mobilization Progress</span>
            <span className="font-bold text-emerald-400">{percentageMobilized}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden p-0.5 border border-zinc-700">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentageMobilized}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Activities */}
        <Card 
          className="cursor-pointer hover:border-emerald-600 transition-all"
          onClick={() => onNavigate("activities")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-500">Upcoming Events</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-zinc-900">{activities.length}</div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mt-2">
              <span>{upcomingActivities.length} scheduled next</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Tasks */}
        <Card 
          className="cursor-pointer hover:border-emerald-600 transition-all"
          onClick={() => onNavigate("tasks")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-500">Pending Tasks</span>
              <div className="p-2 rounded-lg bg-zinc-100 text-zinc-800">
                <CheckSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-zinc-900">{pendingTasks.length}</div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mt-2">
              <span className="text-red-700 font-semibold">{criticalTasks.length} critical priority</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Issues */}
        <Card 
          className="cursor-pointer hover:border-emerald-600 transition-all"
          onClick={() => onNavigate("issues")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-500">Community Grievances</span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-zinc-900">{issues.length}</div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mt-2">
              <span className="text-amber-800 font-medium">{urgentIssues.length} urgent intervention</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-700" />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Team */}
        <Card 
          className="cursor-pointer hover:border-emerald-600 transition-all"
          onClick={() => onNavigate("team")}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-500">Key Field Staff</span>
              <div className="p-2 rounded-lg bg-zinc-100 text-zinc-800">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-zinc-900">{team.length}</div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mt-2">
              <span>Supervising 1,240+ volunteers</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Campaign Training Simulator Scenarios */}
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-zinc-50 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base text-zinc-900">Training Scenarios & Rapid Drills</CardTitle>
                <CardDescription>
                  Click any drill below to simulate real-world campaign events and verify rapid response.
                </CardDescription>
              </div>
            </div>
            <Badge variant="default" className="text-xs bg-emerald-800 text-white">
              Simulator Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="font-bold text-xs text-zinc-900 flex items-center gap-1.5">
                  🌧️ Flash Rain on Rally Day
                </div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Heavy rain predicted for Kebirigo Market walkabout. Test logistics contingency response.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs font-semibold hover:border-emerald-600"
                onClick={() => onTriggerScenario("rain")}
              >
                Trigger Weather Contingency
              </Button>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="font-bold text-xs text-zinc-900 flex items-center gap-1.5">
                  💧 Urgent Ward Water Crisis
                </div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Community borehole pump failure reported in Manga Ward. Test citizen issue logging.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs font-semibold hover:border-emerald-600"
                onClick={() => onTriggerScenario("water")}
              >
                Inject Ward Water Grievance
              </Button>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-2xs flex flex-col justify-between space-y-3">
              <div>
                <div className="font-bold text-xs text-zinc-900 flex items-center gap-1.5">
                  🏍️ 200 Bodaboda Mobilizers
                </div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Local motorcycle sacco leadership offers convoy endorsement across North Mugirango.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs font-semibold hover:border-emerald-600"
                onClick={() => onTriggerScenario("youth")}
              >
                Mobilize Bodaboda Convoy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Split Section: Sub-County Mobilization & Next 48 Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Sub-County Mobilization Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Sub-County Mobilization Standing</CardTitle>
                  <CardDescription>
                    Progress toward victory threshold across four electoral constituencies.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  Updated Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {subCounties.map((sc) => {
                const pct = Math.round((sc.mobilized / sc.target) * 100);
                return (
                  <div key={sc.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-900">{sc.name}</span>
                      <span className="text-zinc-500 font-medium">
                        {formatNumber(sc.mobilized)} / {formatNumber(sc.target)} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${sc.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Total Registered Voters Quota: 340,000
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate("activities")}
                  className="font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                >
                  View Field Schedule →
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Top Community Issues Quick List */}
          <Card>
            <CardHeader className="pb-3 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Top Field Grievances & Citizen Pulse</CardTitle>
                  <CardDescription>
                    Grassroots issues requiring campaign pledges or immediate intervention.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onNavigate("issues")}
                  className="text-xs text-emerald-700 font-semibold"
                >
                  View All ({issues.length}) →
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {issues.slice(0, 3).map((issue) => (
                <div
                  key={issue.id}
                  className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={issue.severity === "Urgent" ? "destructive" : "warning"}
                        className="text-[10px]"
                      >
                        {issue.severity}
                      </Badge>
                      <span className="text-xs font-semibold text-zinc-500">
                        {issue.subCounty} • {issue.ward}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-zinc-900 leading-snug">
                      {issue.title}
                    </div>
                    <p className="text-xs text-zinc-600 line-clamp-1">{issue.summary}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {issue.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 Col): Next 48 Hours Agenda & Quick Tasks */}
        <div className="space-y-6">
          {/* Next 48 Hours */}
          <Card>
            <CardHeader className="pb-3 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  Upcoming Next
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onNavigate("activities")}
                  className="text-xs text-emerald-700 font-semibold"
                >
                  Schedule →
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {upcomingActivities.length === 0 ? (
                <p className="text-xs text-zinc-500 py-4 text-center">
                  No upcoming activities scheduled.
                </p>
              ) : (
                upcomingActivities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl border border-zinc-200 hover:border-emerald-600 bg-white transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {formatDate(act.date)}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">{act.time}</span>
                    </div>
                    <div className="font-bold text-xs text-zinc-900 leading-tight">
                      {act.title}
                    </div>
                    <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{act.venue} ({act.ward})</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1 text-zinc-600">
                      <span>Target: <strong>{formatNumber(act.expectedAttendance)}</strong></span>
                      <Badge variant="secondary" className="text-[10px]">
                        {act.type}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Critical Task Watchlist */}
          <Card>
            <CardHeader className="pb-3 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Critical Tasks</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onNavigate("tasks")}
                  className="text-xs text-emerald-700 font-semibold"
                >
                  All Tasks →
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-2.5">
              {criticalTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="p-2.5 rounded-lg border border-red-200 bg-red-50/40 text-xs flex items-start gap-2.5"
                >
                  <span className="h-2 w-2 rounded-full bg-red-600 shrink-0 mt-1.5" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-semibold text-zinc-900 leading-tight truncate">
                      {task.title}
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Assigned: {task.assignedTo} • Due: {formatDate(task.dueDate)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Help & Testing Card */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-2 text-xs text-zinc-700">
            <div className="flex items-center gap-2 font-bold text-zinc-900">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>Training Prototype Testing</span>
            </div>
            <p className="text-zinc-600 leading-relaxed text-[11px]">
              Use the top <strong>How to Test</strong> guide anytime to test scheduling rallies, assigning tasks, toggling completions, and reviewing citizen grievances.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={onOpenTestGuide}
              className="w-full text-xs font-semibold border-zinc-300"
            >
              Open Testing Checklist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
