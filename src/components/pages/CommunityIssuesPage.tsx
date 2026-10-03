import React, { useState } from "react";
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  Trash2, 
  HeartHandshake,
  Droplet,
  Zap,
  Activity as HeartbeatIcon,
  Truck,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { CommunityIssue, IssueCategory, IssueSeverity, IssueStatus, SubCounty } from "../../types/campaign";
import { formatDate, formatNumber } from "../../lib/utils";

interface CommunityIssuesPageProps {
  issues: CommunityIssue[];
  onAddIssue: () => void;
  onUpdateIssue: (issue: CommunityIssue) => void;
  onDeleteIssue: (id: string) => void;
}

export const CommunityIssuesPage: React.FC<CommunityIssuesPageProps> = ({
  issues,
  onAddIssue,
  onUpdateIssue,
  onDeleteIssue,
}) => {
  const [search, setSearch] = useState("");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");

  const filteredIssues = issues.filter((iss) => {
    const matchesSearch =
      iss.title.toLowerCase().includes(search.toLowerCase()) ||
      iss.summary.toLowerCase().includes(search.toLowerCase()) ||
      iss.ward.toLowerCase().includes(search.toLowerCase()) ||
      iss.villageOrMarket.toLowerCase().includes(search.toLowerCase()) ||
      iss.reportedBy.toLowerCase().includes(search.toLowerCase());

    const matchesSubCounty = selectedSubCounty === "All" || iss.subCounty === selectedSubCounty;
    const matchesCat = selectedCategory === "All" || iss.category === selectedCategory;
    const matchesSev = selectedSeverity === "All" || iss.severity === selectedSeverity;

    return matchesSearch && matchesSubCounty && matchesCat && matchesSev;
  });

  const getCategoryIcon = (category: IssueCategory) => {
    switch (category) {
      case "Water & Boreholes":
        return <Droplet className="w-4 h-4 text-sky-600" />;
      case "Roads & Feeder Bridges":
        return <Truck className="w-4 h-4 text-amber-700" />;
      case "Health Clinics":
        return <HeartbeatIcon className="w-4 h-4 text-rose-600" />;
      case "Bodaboda Sheds & Lighting":
        return <Zap className="w-4 h-4 text-yellow-600" />;
      default:
        return <HeartHandshake className="w-4 h-4 text-emerald-600" />;
    }
  };

  const advanceStatus = (issue: CommunityIssue) => {
    const sequence: IssueStatus[] = ["Logged", "Under Assessment", "Manifesto Pledge", "Community Action Taken"];
    const currentIndex = sequence.indexOf(issue.status);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % sequence.length;
    onUpdateIssue({
      ...issue,
      status: sequence[nextIndex],
    });
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Community Issues & Grassroots Grievances
            </h2>
            <Badge variant="outline" className="text-xs">
              {filteredIssues.length} Reported
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Capture village-level pain points to craft authentic campaign promises and immediate rapid relief.
          </p>
        </div>

        <Button
          onClick={onAddIssue}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shrink-0 gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Log Community Grievance
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by community issue, village, ward, or reporter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-zinc-50/50"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <select
              value={selectedSubCounty}
              onChange={(e) => setSelectedSubCounty(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Sub-Counties</option>
              <option value="West Mugirango">West Mugirango</option>
              <option value="North Mugirango">North Mugirango</option>
              <option value="Borabu">Borabu</option>
              <option value="Kitutu Masaba">Kitutu Masaba</option>
              <option value="County HQ / Central">County HQ / Central</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Water & Boreholes">Water & Boreholes</option>
              <option value="Roads & Feeder Bridges">Roads & Feeder Bridges</option>
              <option value="Health Clinics">Health Clinics</option>
              <option value="Tea & Agriculture Markets">Tea & Agriculture</option>
              <option value="Youth & TVET Skills">Youth & TVET</option>
              <option value="Bodaboda Sheds & Lighting">Bodaboda & Lighting</option>
              <option value="Security & Education">Security & Education</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Severities</option>
              <option value="Urgent">Urgent Priority</option>
              <option value="Moderate">Moderate</option>
              <option value="Advisory">Advisory</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      {filteredIssues.length === 0 ? (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-zinc-800 text-sm">No community issues match your filters</h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Clear your filters or log a newly reported grievance from your field agents.
            </p>
            <Button size="sm" onClick={onAddIssue} className="text-xs">
              + Log Community Grievance
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIssues.map((issue) => {
            const isUrgent = issue.severity === "Urgent";
            return (
              <Card
                key={issue.id}
                className="bg-white border-zinc-200 hover:border-emerald-600 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <CardContent className="p-4 sm:p-5 space-y-3">
                  {/* Top Bar: Category & Severity */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                      {getCategoryIcon(issue.category)}
                      <span>{issue.category}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={isUrgent ? "destructive" : issue.severity === "Moderate" ? "warning" : "secondary"}
                        className="text-[10px]"
                      >
                        {issue.severity}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => advanceStatus(issue)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer transition-colors ${
                          issue.status === "Community Action Taken"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : issue.status === "Manifesto Pledge"
                            ? "bg-blue-100 text-blue-900 border-blue-300"
                            : "bg-zinc-100 text-zinc-800 border-zinc-300"
                        }`}
                        title="Click to advance status"
                      >
                        {issue.status} ↻
                      </button>
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h3 className="font-bold text-base text-zinc-950 leading-snug">
                      {issue.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{issue.villageOrMarket}</span>
                      <span>•</span>
                      <span>{issue.subCounty} ({issue.ward} Ward)</span>
                    </div>
                  </div>

                  {/* Grievance Narrative */}
                  <p className="text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded-lg border border-zinc-150 leading-relaxed">
                    {issue.summary}
                  </p>

                  {/* Campaign Manifesto Commitment */}
                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Candidate's Response / Policy Pledge:</span>
                    </div>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {issue.campaignResponsePlan}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-zinc-400" />
                        <span>~{formatNumber(issue.affectedHouseholds)} households</span>
                      </span>
                      <span>Rep: <strong className="text-zinc-700">{issue.reportedBy}</strong></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete community issue "${issue.title}"?`)) {
                          onDeleteIssue(issue.id);
                        }
                      }}
                      className="p-1 text-zinc-400 hover:text-red-600 rounded hover:bg-red-50 cursor-pointer"
                      title="Delete issue"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
