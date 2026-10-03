import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";
import { Select } from "../ui/Select";
import { Activity, ActivityType, SubCounty } from "../../types/campaign";
import { SUB_COUNTIES_WITH_WARDS } from "../../data/mockData";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (activity: Activity) => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [subCounty, setSubCounty] = useState<SubCounty>("West Mugirango");
  const [ward, setWard] = useState<string>("Nyamira Town");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ActivityType>("Grand Rally");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:00 AM");
  const [coordinator, setCoordinator] = useState("");
  const [expectedAttendance, setExpectedAttendance] = useState("1000");
  const [budgetEstKES, setBudgetEstKES] = useState("50000");
  const [soundSystemBooked, setSoundSystemBooked] = useState(false);
  const [securityClearance, setSecurityClearance] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSubCountyChange = (sc: SubCounty) => {
    setSubCounty(sc);
    const wards = SUB_COUNTIES_WITH_WARDS[sc] || [];
    setWard(wards[0] || "General");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !venue.trim() || !coordinator.trim()) return;

    const newActivity: Activity = {
      id: "act-" + Date.now(),
      title: title.trim(),
      type,
      subCounty,
      ward,
      venue: venue.trim(),
      date,
      time,
      coordinator: coordinator.trim(),
      expectedAttendance: parseInt(expectedAttendance) || 500,
      actualAttendance: 0,
      status: "Scheduled",
      budgetEstKES: parseInt(budgetEstKES) || 0,
      soundSystemBooked,
      securityClearance,
      notes: notes.trim(),
    };

    onAdd(newActivity);
    onClose();
    // Reset form
    setTitle("");
    setVenue("");
    setCoordinator("");
    setNotes("");
  };

  const currentWards = SUB_COUNTIES_WITH_WARDS[subCounty] || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Campaign Activity"
      description="Plan rallies, town halls, bodaboda convoys, and door-to-door field mobilization."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Activity Title"
          placeholder="e.g. Manga Farmers & Tea Growers Consultative Baraza"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Activity Type"
            value={type}
            onChange={(e) => setType(e.target.value as ActivityType)}
          >
            <option value="Grand Rally">Grand Rally</option>
            <option value="Town Hall">Town Hall</option>
            <option value="Door-to-Door Canvassing">Door-to-Door Canvassing</option>
            <option value="Market Walkabout">Market Walkabout</option>
            <option value="Youth League Forum">Youth League Forum</option>
            <option value="Women Leaders Baraza">Women Leaders Baraza</option>
            <option value="Bodaboda Convoy">Bodaboda Convoy</option>
          </Select>

          <Select
            label="Sub-County"
            value={subCounty}
            onChange={(e) => handleSubCountyChange(e.target.value as SubCounty)}
          >
            <option value="West Mugirango">West Mugirango</option>
            <option value="North Mugirango">North Mugirango</option>
            <option value="Borabu">Borabu</option>
            <option value="Kitutu Masaba">Kitutu Masaba</option>
            <option value="County HQ / Central">County HQ / Central</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          >
            {currentWards.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </Select>

          <Input
            label="Venue / Landmark"
            placeholder="e.g. Manga Stadium Grounds"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            label="Time"
            placeholder="10:00 AM"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <Input
            label="Expected Turnout"
            type="number"
            min="10"
            value={expectedAttendance}
            onChange={(e) => setExpectedAttendance(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Lead Coordinator"
            placeholder="e.g. Brian Omari / Moraa Janet"
            value={coordinator}
            onChange={(e) => setCoordinator(e.target.value)}
            required
          />
          <Input
            label="Est. Budget (KES)"
            type="number"
            value={budgetEstKES}
            onChange={(e) => setBudgetEstKES(e.target.value)}
          />
        </div>

        {/* Readiness Checklist */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 space-y-2">
          <span className="text-xs font-semibold text-zinc-900 block">Pre-Event Logistics Readiness:</span>
          <div className="flex flex-wrap gap-4 text-xs text-zinc-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={soundSystemBooked}
                onChange={(e) => setSoundSystemBooked(e.target.checked)}
                className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              PA / Sound System Booked
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={securityClearance}
                onChange={(e) => setSecurityClearance(e.target.checked)}
                className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              Police / Security Clearance Notice
            </label>
          </div>
        </div>

        <Textarea
          label="Agenda & Mobilization Notes"
          placeholder="Key talking points, local endorsements, or special transport arrangements..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Confirm & Save Activity
          </Button>
        </div>
      </form>
    </Modal>
  );
};
