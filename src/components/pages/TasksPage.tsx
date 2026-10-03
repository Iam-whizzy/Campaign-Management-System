import React, { useState } from "react";
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  UserCheck, 
  MapPin,
  Calendar,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { CampaignTask, TaskDepartment, TaskPriority, TaskStatus, SubCounty } from "../../types/campaign";
import { formatDate } from "../../lib/utils";

interface TasksPageProps {
  tasks: CampaignTask[];
  onAddTask: () => void;
  onUpdateTask: (task: CampaignTask) => void;
  onDeleteTask: (id: string) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
      (task.notes && task.notes.toLowerCase().includes(search.toLowerCase())) ||
      task.department.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDepartment === "All" || task.department === selectedDepartment;
    const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority;
    const matchesStatus =
      selectedStatus === "All"
        ? true
        : selectedStatus === "Completed"
        ? task.status === "Completed"
        : task.status !== "Completed";

    return matchesSearch && matchesDept && matchesPriority && matchesStatus;
  });

  const handleToggleTaskStatus = (task: CampaignTask) => {
    const nextStatus: TaskStatus = task.status === "Completed" ? "Pending" : "Completed";
    
    if (nextStatus === "Completed") {
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
          colors: ["#15803d", "#16a34a", "#4ade80", "#09090b"],
        });
      } catch (e) {
        // ignore confetti errors in unsupported env
      }
    }

    onUpdateTask({
      ...task,
      status: nextStatus,
    });
  };

  const handlePriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "Critical":
        return <Badge variant="destructive" className="text-[10px]">Critical</Badge>;
      case "High":
        return <Badge variant="warning" className="text-[10px]">High</Badge>;
      case "Medium":
        return <Badge variant="secondary" className="text-[10px]">Medium</Badge>;
      case "Low":
        return <Badge variant="outline" className="text-[10px]">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Campaign Operations & Deliverables
            </h2>
            <Badge variant="outline" className="text-xs">
              {filteredTasks.length} Visible
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Track permits, sound truck rentals, flyer distribution, and ward captain directives.
          </p>
        </div>

        <Button
          onClick={onAddTask}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shrink-0 gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Assign New Task
        </Button>
      </div>

      {/* Progress Metric Card */}
      <div className="bg-zinc-900 text-white p-4 sm:p-5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="text-xs text-zinc-400 font-medium">Operational Deliverables Health</div>
          <div className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <span>{completedCount} of {tasks.length} Completed</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
              {progressPercent}%
            </span>
          </div>
          <div className="text-xs text-zinc-400">
            {tasks.filter((t) => t.priority === "Critical" && t.status !== "Completed").length} Critical tasks require urgent field clearance
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-1.5">
          <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden p-0.5 border border-zinc-700">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tasks, department, or assigned officer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-zinc-50/50"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Departments</option>
              <option value="Field Operations">Field Operations</option>
              <option value="Logistics & Sound">Logistics & Sound</option>
              <option value="Media & Comms">Media & Comms</option>
              <option value="Legal & Permits">Legal & Permits</option>
              <option value="Youth Mobilization">Youth Mobilization</option>
              <option value="Finance">Finance</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending / In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Card className="border-dashed py-12 text-center">
          <CardContent className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-zinc-800 text-sm">No campaign tasks match your filters</h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Clear your search or create a new assignment for your campaign team.
            </p>
            <Button size="sm" onClick={onAddTask} className="text-xs">
              + Assign New Task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === "Completed";
            return (
              <div
                key={task.id}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCompleted
                    ? "bg-zinc-50 border-zinc-200 text-zinc-500 opacity-80"
                    : "bg-white border-zinc-200 shadow-2xs hover:border-emerald-600 hover:shadow-xs"
                }`}
              >
                {/* Left check & info */}
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggleTaskStatus(task)}
                    className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                      isCompleted
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-zinc-300 hover:border-emerald-600 bg-white"
                    }`}
                    aria-label={isCompleted ? "Mark task pending" : "Mark task completed"}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-bold text-sm sm:text-base leading-snug break-words ${
                          isCompleted ? "line-through text-zinc-500" : "text-zinc-950"
                        }`}
                      >
                        {task.title}
                      </span>
                      {handlePriorityBadge(task.priority)}
                      <Badge variant="outline" className="text-[10px]">
                        {task.department}
                      </Badge>
                    </div>

                    {task.notes && (
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {task.notes}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-emerald-600" />
                        <span>Lead: <strong className="text-zinc-800">{task.assignedTo}</strong></span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>Due: <strong className="text-zinc-700">{formatDate(task.dueDate)}</strong></span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        <span>{task.subCounty} {task.ward ? `(${task.ward})` : ""}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      onUpdateTask({
                        ...task,
                        status: e.target.value as TaskStatus,
                      })
                    }
                    className="text-xs font-semibold px-2 py-1 rounded-md border border-zinc-200 bg-white text-zinc-700 cursor-pointer focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete task "${task.title}"?`)) {
                        onDeleteTask(task.id);
                      }
                    }}
                    className="p-1 text-zinc-400 hover:text-red-600 rounded hover:bg-red-50 cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
