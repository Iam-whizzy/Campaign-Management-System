import React from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Calendar, 
  ListTodo, 
  MessageSquareWarning, 
  Users, 
  RotateCcw,
  Sparkles
} from "lucide-react";

interface TestGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const TestGuideModal: React.FC<TestGuideModalProps> = ({
  isOpen,
  onClose,
  onResetData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How to Test County Campaign Manager"
      description="Quick test scenarios and instructions to evaluate the training prototype on mobile and desktop."
      maxWidth="xl"
    >
      <div className="space-y-5 text-sm text-zinc-700">
        {/* Prototype banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-emerald-950 text-sm">Fictional Training Prototype</div>
            <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
              This application contains fictional county campaign data (candidates, wards, mobilization figures, and community issues). All data is stored in your browser's local memory with full CRUD capability.
            </p>
          </div>
        </div>

        {/* Step-by-Step Test Scenarios */}
        <div className="space-y-3">
          <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
            Key Feature Test Scenarios
          </h4>

          {/* Test 1: Dashboard */}
          <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[10px]">1. Dashboard</Badge>
              <span className="font-semibold text-zinc-900 text-xs">Voter Progress & Quick Scenarios</span>
            </div>
            <p className="text-xs text-zinc-600">
              • Observe the Voter Mobilization Gauge (target vs actual).<br />
              • Check the Sub-County turnout progress bars.<br />
              • Click any of the <strong>Interactive Training Scenarios</strong> (e.g. "Simulate Flash Rains on Rally Day") to see instant contingency tasks injected.
            </p>
          </div>

          {/* Test 2: Activities */}
          <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">2. Activities</Badge>
              <span className="font-semibold text-zinc-900 text-xs">Schedule & Attendance Counter</span>
            </div>
            <p className="text-xs text-zinc-600">
              • Click <strong>+ Schedule Activity</strong> to open the full form; select Sub-County, Ward, expected turnout, and logistical checks (PA system & police clearance).<br />
              • Filter activities by Sub-County or Status (Scheduled, In Progress, Completed).<br />
              • Use the <strong>+ / - Attendance</strong> buttons on any card to simulate field crowd check-ins in real-time.
            </p>
          </div>

          {/* Test 3: Tasks */}
          <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="warning" className="text-[10px]">3. Tasks</Badge>
              <span className="font-semibold text-zinc-900 text-xs">Operational Checklist & Completion</span>
            </div>
            <p className="text-xs text-zinc-600">
              • Click checkboxes next to any task to toggle status between Pending and Completed with instant visual celebration.<br />
              • Filter by Department (Logistics, Field Ops, Media, Legal) or Priority (Critical, High).<br />
              • Click <strong>+ New Task</strong> to assign deliverables to field agents.
            </p>
          </div>

          {/* Test 4: Community Issues */}
          <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-[10px]">4. Community Issues</Badge>
              <span className="font-semibold text-zinc-900 text-xs">Grievance Logging & Manifesto Response</span>
            </div>
            <p className="text-xs text-zinc-600">
              • Review citizen concerns reported by ward mobilizers (water boreholes, tea road impassable, bodaboda lighting).<br />
              • Click the status dropdown on any issue to progress it (e.g. from <em>Logged</em> to <em>Manifesto Pledge</em> or <em>Action Taken</em>).<br />
              • Click <strong>+ Log Issue</strong> to record a newly reported grassroots grievance.
            </p>
          </div>

          {/* Test 5: Team */}
          <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50/50 space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">5. Team</Badge>
              <span className="font-semibold text-zinc-900 text-xs">Campaign Hierarchy & Field Deployment</span>
            </div>
            <p className="text-xs text-zinc-600">
              • Filter by Sub-County or Role (Campaign Director, Youth Mobilizer, Women League).<br />
              • Click <strong>Simulate Call</strong> or <strong>Copy Briefing Note</strong> to test field communication workflows.<br />
              • Click <strong>+ Add Member</strong> to expand the campaign roster.
            </p>
          </div>
        </div>

        {/* Screen Responsiveness Testing */}
        <div className="bg-zinc-100 rounded-xl p-3.5 space-y-2 border border-zinc-200">
          <div className="flex items-center gap-2 font-bold text-xs text-zinc-900">
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span>Mobile vs Desktop Testing</span>
            <Monitor className="w-4 h-4 text-zinc-600 ml-1" />
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            • <strong>On Mobile (Phone View):</strong> Notice the fixed bottom navigation bar with active indicators and quick badge counts. Modals adapt as clean touch overlays. Forms have large tap targets.<br />
            • <strong>On Desktop:</strong> Enjoy the sidebar navigation, wider metrics dashboard, and side-by-side grid layouts.
          </p>
        </div>

        {/* Reset / Actions */}
        <div className="pt-3 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (window.confirm("Reset all campaign activities, tasks, and issues back to original demo values?")) {
                onResetData();
                onClose();
              }
            }}
            className="w-full sm:w-auto text-xs text-zinc-600 hover:text-red-700"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset to Default Demo Data
          </Button>

          <Button type="button" onClick={onClose} className="w-full sm:w-auto text-xs">
            Got it, Let's Start Testing
          </Button>
        </div>
      </div>
    </Modal>
  );
};
