import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TeamMember, TeamRole, SubCounty } from "../../types/campaign";
import { SUB_COUNTIES_WITH_WARDS } from "../../data/mockData";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: TeamMember) => void;
}

export const AddTeamModal: React.FC<AddTeamModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<TeamRole>("Sub-County Coordinator");
  const [subCounty, setSubCounty] = useState<SubCounty>("West Mugirango");
  const [phone, setPhone] = useState("+254 7");
  const [email, setEmail] = useState("");
  const [volunteersLed, setVolunteersLed] = useState("50");
  const [status, setStatus] = useState<"Active Field" | "Headquarters" | "On Call">("Active Field");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const assignedWards = SUB_COUNTIES_WITH_WARDS[subCounty] || ["Central Jurisdiction"];

    const newMember: TeamMember = {
      id: "tm-" + Date.now(),
      name: name.trim(),
      role,
      subCounty,
      assignedWards,
      phone: phone.trim() || "+254 700 000 000",
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, ".")}@campaign.ke`,
      volunteersLed: parseInt(volunteersLed) || 10,
      status,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    onAdd(newMember);
    onClose();
    setName("");
    setPhone("+254 7");
    setEmail("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Campaign Team Member"
      description="Register field coordinators, youth league captains, women leaders, and headquarters staff."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Official Name"
          placeholder="e.g. Dennis Mogusu Onkware"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Campaign Role"
            value={role}
            onChange={(e) => setRole(e.target.value as TeamRole)}
          >
            <option value="Sub-County Coordinator">Sub-County Coordinator</option>
            <option value="Youth League Mobilizer">Youth League Mobilizer</option>
            <option value="Women League Coordinator">Women League Coordinator</option>
            <option value="Head of Field Mobilization">Head of Field Mobilization</option>
            <option value="Communications Lead">Communications Lead</option>
            <option value="Logistics & Transport Marshal">Logistics & Transport Marshal</option>
            <option value="Deputy Director / Strategy">Deputy Director / Strategy</option>
          </Select>

          <Select
            label="Sub-County Assignment"
            value={subCounty}
            onChange={(e) => setSubCounty(e.target.value as SubCounty)}
          >
            <option value="West Mugirango">West Mugirango</option>
            <option value="North Mugirango">North Mugirango</option>
            <option value="Borabu">Borabu</option>
            <option value="Kitutu Masaba">Kitutu Masaba</option>
            <option value="County HQ / Central">County HQ / Central</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Phone Number (Kenyan format)"
            placeholder="+254 712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            placeholder="coordinator@campaign.ke"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Volunteers Supervised"
            type="number"
            min="0"
            value={volunteersLed}
            onChange={(e) => setVolunteersLed(e.target.value)}
          />

          <Select
            label="Deployment Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="Active Field">Active Field</option>
            <option value="Headquarters">Headquarters</option>
            <option value="On Call">On Call</option>
          </Select>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add Team Member
          </Button>
        </div>
      </form>
    </Modal>
  );
};
