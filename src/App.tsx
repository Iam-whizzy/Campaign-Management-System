import React, { useState, useEffect } from "react";
import { 
  Header 
} from "./components/layout/Header";
import { 
  Sidebar, 
  NavTab 
} from "./components/layout/Sidebar";
import { 
  BottomNav 
} from "./components/layout/BottomNav";
import { 
  DashboardPage 
} from "./components/pages/DashboardPage";
import { 
  ActivitiesPage 
} from "./components/pages/ActivitiesPage";
import { 
  TasksPage 
} from "./components/pages/TasksPage";
import { 
  CommunityIssuesPage 
} from "./components/pages/CommunityIssuesPage";
import { 
  TeamPage 
} from "./components/pages/TeamPage";
import { 
  TestGuideModal 
} from "./components/modals/TestGuideModal";
import { 
  AddActivityModal 
} from "./components/modals/AddActivityModal";
import { 
  AddTaskModal 
} from "./components/modals/AddTaskModal";
import { 
  AddIssueModal 
} from "./components/modals/AddIssueModal";
import { 
  AddTeamModal 
} from "./components/modals/AddTeamModal";
import { 
  Activity, 
  CampaignTask, 
  CommunityIssue, 
  TeamMember 
} from "./types/campaign";
import {
  loadStoredActivities,
  saveStoredActivities,
  loadStoredTasks,
  saveStoredTasks,
  loadStoredIssues,
  saveStoredIssues,
  loadStoredTeam,
  saveStoredTeam,
  loadStoredProfile,
  saveStoredProfile,
  resetAllCampaignData,
} from "./utils/storage";
import {
  INITIAL_ACTIVITIES,
  INITIAL_TASKS,
  INITIAL_COMMUNITY_ISSUES,
  INITIAL_TEAM_MEMBERS,
  DEFAULT_CAMPAIGN_PROFILE,
} from "./data/mockData";

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("dashboard");
  const [profile, setProfile] = useState(loadStoredProfile);
  const [activities, setActivities] = useState<Activity[]>(loadStoredActivities);
  const [tasks, setTasks] = useState<CampaignTask[]>(loadStoredTasks);
  const [issues, setIssues] = useState<CommunityIssue[]>(loadStoredIssues);
  const [team, setTeam] = useState<TeamMember[]>(loadStoredTeam);

  // Modals
  const [isTestGuideOpen, setIsTestGuideOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddIssueOpen, setIsAddIssueOpen] = useState(false);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);

  // Persist state updates
  useEffect(() => {
    saveStoredActivities(activities);
  }, [activities]);

  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredIssues(issues);
  }, [issues]);

  useEffect(() => {
    saveStoredTeam(team);
  }, [team]);

  useEffect(() => {
    saveStoredProfile(profile);
  }, [profile]);

  // Handlers for Activities
  const handleAddActivity = (newAct: Activity) => {
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleUpdateActivity = (updatedAct: Activity) => {
    setActivities((prev) =>
      prev.map((act) => (act.id === updatedAct.id ? updatedAct : act))
    );
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((act) => act.id !== id));
  };

  // Handlers for Tasks
  const handleAddTask = (newTask: CampaignTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updatedTask: CampaignTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Handlers for Issues
  const handleAddIssue = (newIssue: CommunityIssue) => {
    setIssues((prev) => [newIssue, ...prev]);
  };

  const handleUpdateIssue = (updatedIssue: CommunityIssue) => {
    setIssues((prev) =>
      prev.map((iss) => (iss.id === updatedIssue.id ? updatedIssue : iss))
    );
  };

  const handleDeleteIssue = (id: string) => {
    setIssues((prev) => prev.filter((iss) => iss.id !== id));
  };

  // Handlers for Team
  const handleAddTeamMember = (newMember: TeamMember) => {
    setTeam((prev) => [newMember, ...prev]);
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((tm) => tm.id !== id));
  };

  // Reset to default
  const handleResetData = () => {
    resetAllCampaignData();
    setActivities(INITIAL_ACTIVITIES);
    setTasks(INITIAL_TASKS);
    setIssues(INITIAL_COMMUNITY_ISSUES);
    setTeam(INITIAL_TEAM_MEMBERS);
    setProfile(DEFAULT_CAMPAIGN_PROFILE);
  };

  // Interactive Scenario Triggers
  const handleTriggerScenario = (type: "rain" | "water" | "youth") => {
    if (type === "rain") {
      const emergencyTask: CampaignTask = {
        id: "tsk-weather-" + Date.now(),
        title: "🌧️ EMERGENCY: Mount heavy-duty waterproof tarpaulins & backup generator for Kebirigo Rally",
        department: "Logistics & Sound",
        priority: "Critical",
        status: "Pending",
        dueDate: new Date().toISOString().split("T")[0],
        assignedTo: "Dennis Moseti",
        subCounty: "West Mugirango",
        ward: "Bonyamatuta",
        notes: "Heavy afternoon downpour forecast. Ensure sound truck and stage amplifiers are shielded.",
      };
      setTasks((prev) => [emergencyTask, ...prev]);
      setCurrentTab("tasks");
    } else if (type === "water") {
      const urgentWaterIssue: CommunityIssue = {
        id: "iss-drill-" + Date.now(),
        title: "💧 Crisis: Manga Ward Borehole Submersible Motor Burnout",
        category: "Water & Boreholes",
        subCounty: "Kitutu Masaba",
        ward: "Manga",
        villageOrMarket: "Manga Center Market",
        severity: "Urgent",
        status: "Logged",
        dateReported: new Date().toISOString().split("T")[0],
        reportedBy: "Elder Peter Makori",
        affectedHouseholds: 1100,
        summary: "1,100 households and Manga Maternity clinic stranded without running water for 4 days.",
        campaignResponsePlan: "Governor candidate pledges immediate replacement motor installation within 48 hours.",
      };
      setIssues((prev) => [urgentWaterIssue, ...prev]);
      setCurrentTab("issues");
    } else if (type === "youth") {
      const newConvoyAct: Activity = {
        id: "act-convoy-" + Date.now(),
        title: "🏍️ 200 Bodaboda Security & Economic Empowerment Convoy",
        type: "Bodaboda Convoy",
        subCounty: "North Mugirango",
        ward: "Ekerenyo",
        venue: "Ekerenyo Town Roundabout",
        date: new Date().toISOString().split("T")[0],
        time: "02:00 PM",
        coordinator: "Dennis Moseti",
        expectedAttendance: 1500,
        actualAttendance: 450,
        status: "Scheduled",
        budgetEstKES: 95000,
        soundSystemBooked: true,
        securityClearance: true,
        notes: "Endorsement convoy by North Mugirango Motorcycle Riders Sacco.",
      };
      setActivities((prev) => [newConvoyAct, ...prev]);
      setProfile((p: typeof DEFAULT_CAMPAIGN_PROFILE) => ({
        ...p,
        mobilizedVoters: p.mobilizedVoters + 2500,
      }));
      setCurrentTab("activities");
    }
  };

  const pendingTasksCount = tasks.filter((t) => t.status !== "Completed").length;
  const urgentIssuesCount = issues.filter((i) => i.severity === "Urgent").length;

  return (
    <div className="min-h-screen bg-zinc-100/70 text-zinc-900 flex flex-col font-sans antialiased selection:bg-emerald-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        onOpenTestGuide={() => setIsTestGuideOpen(true)}
        onOpenAddActivity={() => setIsAddActivityOpen(true)}
        onOpenAddTask={() => setIsAddTaskOpen(true)}
        onOpenAddIssue={() => setIsAddIssueOpen(true)}
        onOpenAddTeam={() => setIsAddTeamOpen(true)}
        countyName={profile.countyName}
        candidateName={profile.candidateName}
      />

      {/* Main Content Layout with Desktop Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          pendingTasksCount={pendingTasksCount}
          urgentIssuesCount={urgentIssuesCount}
          activitiesCount={activities.length}
          teamCount={team.length}
          onOpenTestGuide={() => setIsTestGuideOpen(true)}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto max-w-full">
          {currentTab === "dashboard" && (
            <DashboardPage
              activities={activities}
              tasks={tasks}
              issues={issues}
              team={team}
              onNavigate={setCurrentTab}
              onOpenTestGuide={() => setIsTestGuideOpen(true)}
              onTriggerScenario={handleTriggerScenario}
              candidateName={profile.candidateName}
              runningMate={profile.runningMate}
              countyName={profile.countyName}
              slogan={profile.campaignSlogan}
              targetVoters={profile.targetVoters}
              mobilizedVoters={profile.mobilizedVoters}
            />
          )}

          {currentTab === "activities" && (
            <ActivitiesPage
              activities={activities}
              onAddActivity={() => setIsAddActivityOpen(true)}
              onUpdateActivity={handleUpdateActivity}
              onDeleteActivity={handleDeleteActivity}
            />
          )}

          {currentTab === "tasks" && (
            <TasksPage
              tasks={tasks}
              onAddTask={() => setIsAddTaskOpen(true)}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {currentTab === "issues" && (
            <CommunityIssuesPage
              issues={issues}
              onAddIssue={() => setIsAddIssueOpen(true)}
              onUpdateIssue={handleUpdateIssue}
              onDeleteIssue={handleDeleteIssue}
            />
          )}

          {currentTab === "team" && (
            <TeamPage
              team={team}
              onAddMember={() => setIsAddTeamOpen(true)}
              onDeleteMember={handleDeleteTeamMember}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Phone-Friendly) */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        pendingTasksCount={pendingTasksCount}
        urgentIssuesCount={urgentIssuesCount}
      />

      {/* Modals */}
      <TestGuideModal
        isOpen={isTestGuideOpen}
        onClose={() => setIsTestGuideOpen(false)}
        onResetData={handleResetData}
      />

      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => setIsAddActivityOpen(false)}
        onAdd={handleAddActivity}
      />

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAdd={handleAddTask}
      />

      <AddIssueModal
        isOpen={isAddIssueOpen}
        onClose={() => setIsAddIssueOpen(false)}
        onAdd={handleAddIssue}
      />

      <AddTeamModal
        isOpen={isAddTeamOpen}
        onClose={() => setIsAddTeamOpen(false)}
        onAdd={handleAddTeamMember}
      />
    </div>
  );
}
