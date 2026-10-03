import React, { useState } from "react";
import { 
  CalendarDays, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Volume2, 
  ShieldCheck, 
  Clock, 
  Check, 
  Trash2, 
  PlusCircle, 
  MinusCircle,
  Banknote,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Activity, ActivityStatus, SubCounty, ActivityType } from "../../types/campaign";
import { formatDate, formatNumber } from "../../lib/utils";

interface ActivitiesPageProps {
  activities: Activity[];
  onAddActivity: () => void;
  onUpdateActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({
  activities,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
}) => {
  const [search, setSearch] = useState("");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(search.toLowerCase()) ||
      act.venue.toLowerCase().includes(search.toLowerCase()) ||
      act.ward.toLowerCase().includes(search.toLowerCase()) ||
      act.coordinator.toLowerCase().includes(search.toLowerCase());

    const matchesSubCounty = selectedSubCounty === "All" || act.subCounty === selectedSubCounty;
    const matchesStatus = selectedStatus === "All" || act.status === selectedStatus;
    const matchesType = selectedType === "All" || act.type === selectedType;

    return matchesSearch && matchesSubCounty && matchesStatus && matchesType;
  });

  const handleAttendanceChange = (act: Activity, delta: number) => {
    const newCount = Math.max(0, act.actualAttendance + delta);
    onUpdateActivity({
      ...act,
      actualAttendance: newCount,
    });
  };

  const handleStatusChange = (act: Activity, status: ActivityStatus) => {
    onUpdateActivity({
      ...act,
      status,
    });
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Campaign Activities & Field Rallies
            </h2>
            <Badge variant="outline" className="text-xs">
              {filteredActivities.length} Listed
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Coordinate town halls, roadside stopovers, youth barazas, and volunteer canvassing across all wards.
          </p>
        </div>

        <Button
          onClick={onAddActivity}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shrink-0 gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Schedule Activity
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by rally title, venue, ward, or coordinator..."
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Postponed">Postponed</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Types</option>
              <option value="Grand Rally">Grand Rally</option>
              <option value="Town Hall">Town Hall</option>
              <option value="Door-to-Door Canvassing">Door-to-Door</option>
              <option value="Market Walkabout">Market Walkabout</option>
              <option value="Youth League Forum">Youth Forum</option>
              <option value="Women Leaders Baraza">Women Baraza</option>
              <option value="Bodaboda Convoy">Bodaboda Convoy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-zinc-800 text-sm">No matching campaign activities found</h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Try adjusting your search criteria or schedule a new rally for your campaign team.
            </p>
            <Button size="sm" onClick={onAddActivity} className="text-xs">
              + Schedule New Activity
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredActivities.map((act) => {
            const isCompleted = act.status === "Completed";
            const attendancePercent = act.expectedAttendance
              ? Math.min(100, Math.round((act.actualAttendance / act.expectedAttendance) * 100))
              : 0;

            return (
              <Card
                key={act.id}
                className={`transition-all hover:shadow-md ${
                  isCompleted ? "bg-zinc-50/70 border-zinc-200" : "bg-white"
                }`}
              >
                <CardContent className="p-4 sm:p-5 space-y-4">
                  {/* Top Bar: Date & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        {formatDate(act.date)} • {act.time}
                      </span>
                      <Badge variant="outline" className="text-[11px] font-medium text-zinc-700">
                        {act.type}
                      </Badge>
                    </div>

                    <select
                      value={act.status}
                      onChange={(e) => handleStatusChange(act, e.target.value as ActivityStatus)}
                      aria-label="Activity Status"
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border cursor-pointer focus:outline-none ${
                        act.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : act.status === "In Progress"
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : act.status === "Postponed"
                          ? "bg-rose-100 text-rose-800 border-rose-300"
                          : "bg-zinc-100 text-zinc-800 border-zinc-300"
                      }`}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Postponed">Postponed</option>
                    </select>
                  </div>

                  {/* Title & Location */}
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 leading-snug">
                      {act.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{act.venue}</span>
                      <span>•</span>
                      <span className="font-semibold text-zinc-700">{act.subCounty} ({act.ward} Ward)</span>
                    </div>
                  </div>

                  {/* Notes / Talking Points */}
                  {act.notes && (
                    <p className="text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded-lg border border-zinc-150 leading-relaxed">
                      {act.notes}
                    </p>
                  )}

                  {/* Crowd Attendance Tracker (Interactive) */}
                  <div className="bg-zinc-50/80 p-3 rounded-xl border border-zinc-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-zinc-700 font-semibold">
                        <Users className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Field Attendance Turnout:</span>
                      </div>
                      <div className="text-zinc-900 font-bold">
                        {formatNumber(act.actualAttendance)}{" "}
                        <span className="text-zinc-500 font-normal">/ target {formatNumber(act.expectedAttendance)}</span>
                      </div>
                    </div>

                    <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all"
                        style={{ width: `${attendancePercent}%` }}
                      />
                    </div>

                    {/* Quick increment/decrement buttons for crowd test */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-zinc-500 font-medium">
                        Coord: <strong className="text-zinc-800">{act.coordinator}</strong>
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAttendanceChange(act, -50)}
                          className="px-2 py-0.5 text-xs bg-white border border-zinc-300 rounded hover:bg-zinc-100 text-zinc-700 cursor-pointer"
                          title="Decrease 50"
                        >
                          -50
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAttendanceChange(act, +50)}
                          className="px-2 py-0.5 text-xs bg-emerald-50 border border-emerald-300 text-emerald-800 rounded font-semibold hover:bg-emerald-100 cursor-pointer"
                          title="Increase 50"
                        >
                          +50
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAttendanceChange(act, +200)}
                          className="px-2 py-0.5 text-xs bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700 cursor-pointer"
                          title="Increase 200"
                        >
                          +200
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Readiness & Budget Badges */}
                  <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded ${
                          act.soundSystemBooked
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                        {act.soundSystemBooked ? "Sound Booked" : "Sound Pending"}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded ${
                          act.securityClearance
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {act.securityClearance ? "Police Cleared" : "Permit Pending"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {act.budgetEstKES > 0 && (
                        <span className="text-[11px] text-zinc-500 font-medium">
                          KES {formatNumber(act.budgetEstKES)}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete activity "${act.title}"?`)) {
                            onDeleteActivity(act.id);
                          }
                        }}
                        className="p-1 text-zinc-400 hover:text-red-600 rounded hover:bg-red-50 cursor-pointer"
                        title="Delete Activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
