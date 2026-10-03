import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  UserCheck, 
  Check, 
  Trash2, 
  Copy, 
  PhoneCall,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { TeamMember, TeamRole, SubCounty } from "../../types/campaign";
import { formatNumber } from "../../lib/utils";

interface TeamPageProps {
  team: TeamMember[];
  onAddMember: () => void;
  onDeleteMember: (id: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  team,
  onAddMember,
  onDeleteMember,
}) => {
  const [search, setSearch] = useState("");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredTeam = team.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.phone.includes(search) ||
      member.assignedWards.some((w) => w.toLowerCase().includes(search.toLowerCase()));

    const matchesSubCounty = selectedSubCounty === "All" || member.subCounty === selectedSubCounty;
    const matchesRole = selectedRole === "All" || member.role === selectedRole;

    return matchesSearch && matchesSubCounty && matchesRole;
  });

  const handleSimulateCall = (member: TeamMember) => {
    showToast(`📞 Dialing ${member.name} (${member.phone}) on encrypted field comms...`);
  };

  const handleCopyBriefing = (member: TeamMember) => {
    const note = `[CAMPAIGN DISPATCH]\nTo: ${member.name} (${member.role})\nJurisdiction: ${member.subCounty} - Wards: ${member.assignedWards.join(", ")}\nDirective: Accelerate voter door-to-door validation and verify polling agents.`;
    navigator.clipboard?.writeText(note);
    showToast(`✓ Briefing dispatch note copied to clipboard for ${member.name}!`);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8 relative">
      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-zinc-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/40 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Campaign Team & Field Marshals
            </h2>
            <Badge variant="outline" className="text-xs">
              {filteredTeam.length} Officers
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Command structure, sub-county directors, youth captains, and grassroots mobilizers.
          </p>
        </div>

        <Button
          onClick={onAddMember}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shrink-0 gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search team member by name, phone, email, or ward..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-zinc-50/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
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
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Roles</option>
              <option value="Campaign Director">Campaign Director</option>
              <option value="Deputy Director / Strategy">Deputy Director</option>
              <option value="Sub-County Coordinator">Sub-County Coord</option>
              <option value="Youth League Mobilizer">Youth Mobilizer</option>
              <option value="Women League Coordinator">Women League</option>
              <option value="Communications Lead">Communications</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      {filteredTeam.length === 0 ? (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-zinc-800 text-sm">No team members match your filter</h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Broaden your filters or enlist a new campaign coordinator.
            </p>
            <Button size="sm" onClick={onAddMember} className="text-xs">
              + Add Team Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeam.map((member) => (
            <Card
              key={member.id}
              className="bg-white border-zinc-200 hover:border-emerald-600 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <CardContent className="p-4 sm:p-5 space-y-4">
                {/* Header: Avatar, Name, Role */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-emerald-700 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-zinc-950 leading-tight">
                        {member.name}
                      </h3>
                      <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={
                      member.status === "Active Field"
                        ? "success"
                        : member.status === "Headquarters"
                        ? "dark"
                        : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {member.status}
                  </Badge>
                </div>

                {/* Sub-County & Wards */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-600 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Jurisdiction: <strong>{member.subCounty}</strong></span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {member.assignedWards.map((w) => (
                      <span
                        key={w}
                        className="text-[10px] bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded border border-zinc-200"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact and Mobilizer stats */}
                <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-zinc-600">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-zinc-400" />
                      <span>{member.phone}</span>
                    </span>
                    <span className="font-semibold text-zinc-800">
                      {formatNumber(member.volunteersLed)} volunteers led
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] truncate">
                    <Mail className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2.5 text-emerald-800 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                      onClick={() => handleSimulateCall(member)}
                    >
                      <PhoneCall className="w-3 h-3 mr-1 text-emerald-700" />
                      Simulate Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2 text-zinc-600"
                      onClick={() => handleCopyBriefing(member)}
                      title="Copy Dispatch Briefing Note"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Remove team member "${member.name}"?`)) {
                        onDeleteMember(member.id);
                      }
                    }}
                    className="p-1 text-zinc-400 hover:text-red-600 rounded hover:bg-red-50 cursor-pointer"
                    title="Remove member"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
