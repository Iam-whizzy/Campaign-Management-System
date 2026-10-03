import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input, Textarea } from "../ui/Input";
import { Select } from "../ui/Select";
import { CommunityIssue, IssueCategory, IssueSeverity, SubCounty } from "../../types/campaign";
import { SUB_COUNTIES_WITH_WARDS } from "../../data/mockData";

interface AddIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (issue: CommunityIssue) => void;
}

export const AddIssueModal: React.FC<AddIssueModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<IssueCategory>("Water & Boreholes");
  const [subCounty, setSubCounty] = useState<SubCounty>("West Mugirango");
  const [ward, setWard] = useState<string>("Nyamira Town");
  const [villageOrMarket, setVillageOrMarket] = useState("");
  const [severity, setSeverity] = useState<IssueSeverity>("Urgent");
  const [reportedBy, setReportedBy] = useState("");
  const [affectedHouseholds, setAffectedHouseholds] = useState("500");
  const [summary, setSummary] = useState("");
  const [campaignResponsePlan, setCampaignResponsePlan] = useState("");

  const handleSubCountyChange = (sc: SubCounty) => {
    setSubCounty(sc);
    const wards = SUB_COUNTIES_WITH_WARDS[sc] || [];
    setWard(wards[0] || "General");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !villageOrMarket.trim() || !summary.trim()) return;

    const newIssue: CommunityIssue = {
      id: "iss-" + Date.now(),
      title: title.trim(),
      category,
      subCounty,
      ward,
      villageOrMarket: villageOrMarket.trim(),
      severity,
      status: "Logged",
      dateReported: new Date().toISOString().split("T")[0],
      reportedBy: reportedBy.trim() || "Field Volunteer Captain",
      affectedHouseholds: parseInt(affectedHouseholds) || 100,
      summary: summary.trim(),
      campaignResponsePlan: campaignResponsePlan.trim() || "Under review by policy manifesto committee.",
    };

    onAdd(newIssue);
    onClose();
    setTitle("");
    setVillageOrMarket("");
    setSummary("");
    setCampaignResponsePlan("");
  };

  const currentWards = SUB_COUNTIES_WITH_WARDS[subCounty] || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Community Grievance / Issue"
      description="Track field-reported citizen priorities to shape the candidate's manifesto and grassroots pledges."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Issue Title"
          placeholder="e.g. Broken water pipe along Manga dispensary road"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as IssueCategory)}
          >
            <option value="Water & Boreholes">Water & Boreholes</option>
            <option value="Roads & Feeder Bridges">Roads & Feeder Bridges</option>
            <option value="Health Clinics">Health Clinics</option>
            <option value="Tea & Agriculture Markets">Tea & Agriculture Markets</option>
            <option value="Youth & TVET Skills">Youth & TVET Skills</option>
            <option value="Bodaboda Sheds & Lighting">Bodaboda Sheds & Lighting</option>
            <option value="Security & Education">Security & Education</option>
          </Select>

          <Select
            label="Urgency Severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as IssueSeverity)}
          >
            <option value="Urgent">Urgent (High political & civic impact)</option>
            <option value="Moderate">Moderate (Steady community concern)</option>
            <option value="Advisory">Advisory (General suggestion)</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Village / Market Centre"
            placeholder="e.g. Kebirigo Junction"
            value={villageOrMarket}
            onChange={(e) => setVillageOrMarket(e.target.value)}
            required
          />
          <Input
            label="Est. Households Affected"
            type="number"
            value={affectedHouseholds}
            onChange={(e) => setAffectedHouseholds(e.target.value)}
            required
          />
          <Input
            label="Reported By (Mobilizer)"
            placeholder="e.g. Elder Peter Makori"
            value={reportedBy}
            onChange={(e) => setReportedBy(e.target.value)}
          />
        </div>

        <Textarea
          label="Detailed Community Problem Summary"
          placeholder="Describe how long the issue has persisted, citizen sentiment, and who is most affected..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          required
        />

        <Textarea
          label="Candidate's Proposed Response / Manifesto Pledge"
          placeholder="What policy solution or direct intervention will the campaign commit to?"
          value={campaignResponsePlan}
          onChange={(e) => setCampaignResponsePlan(e.target.value)}
          rows={2}
        />

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Log Community Issue
          </Button>
        </div>
      </form>
    </Modal>
  );
};
