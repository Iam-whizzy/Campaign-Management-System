import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";
import { Select } from "../ui/Select";
import { CampaignTask, TaskDepartment, TaskPriority, SubCounty } from "../../types/campaign";
import { SUB_COUNTIES_WITH_WARDS } from "../../data/mockData";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: CampaignTask) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState<TaskDepartment>("Field Operations");
  const [priority, setPriority] = useState<TaskPriority>("High");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [subCounty, setSubCounty] = useState<SubCounty>("West Mugirango");
  const [ward, setWard] = useState<string>("Nyamira Town");
  const [notes, setNotes] = useState("");

  const handleSubCountyChange = (sc: SubCounty) => {
    setSubCounty(sc);
    const wards = SUB_COUNTIES_WITH_WARDS[sc] || [];
    setWard(wards[0] || "General");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !assignedTo.trim()) return;

    const newTask: CampaignTask = {
      id: "tsk-" + Date.now(),
      title: title.trim(),
      department,
      priority,
      status: "Pending",
      dueDate,
      assignedTo: assignedTo.trim(),
      subCounty,
      ward,
      notes: notes.trim(),
    };

    onAdd(newTask);
    onClose();
    setTitle("");
    setAssignedTo("");
    setNotes("");
  };

  const currentWards = SUB_COUNTIES_WITH_WARDS[subCounty] || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Campaign Task"
      description="Assign actionable field, media, logistics, or legal deliverables to campaign officers."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Description"
          placeholder="e.g. Procure 40 battery megaphones for Ward mobilizers"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value as TaskDepartment)}
          >
            <option value="Field Operations">Field Operations</option>
            <option value="Logistics & Sound">Logistics & Sound</option>
            <option value="Media & Comms">Media & Comms</option>
            <option value="Legal & Permits">Legal & Permits</option>
            <option value="Youth Mobilization">Youth Mobilization</option>
            <option value="Finance">Finance</option>
          </Select>

          <Select
            label="Priority Level"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="Critical">Critical (Immediate)</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Assigned Lead Officer"
            placeholder="e.g. Dennis Moseti / Faith Kwamboka"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />

          <Input
            label="Target Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Sub-County Focus"
            value={subCounty}
            onChange={(e) => handleSubCountyChange(e.target.value as SubCounty)}
          >
            <option value="West Mugirango">West Mugirango</option>
            <option value="North Mugirango">North Mugirango</option>
            <option value="Borabu">Borabu</option>
            <option value="Kitutu Masaba">Kitutu Masaba</option>
            <option value="County HQ / Central">County HQ / Central</option>
          </Select>

          <Select
            label="Ward Focus"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          >
            {currentWards.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </Select>
        </div>

        <Textarea
          label="Execution Notes & Directives"
          placeholder="Specific vendors, contact details, or milestone checkpoints..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
