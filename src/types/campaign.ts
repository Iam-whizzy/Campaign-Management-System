export type SubCounty = 
  | "West Mugirango" 
  | "North Mugirango" 
  | "Borabu" 
  | "Kitutu Masaba"
  | "County HQ / Central";

export type CountyOption = "Nyamira" | "Nairobi" | "Machakos" | "Kisumu";

export type ActivityType = 
  | "Grand Rally" 
  | "Town Hall" 
  | "Door-to-Door Canvassing" 
  | "Market Walkabout" 
  | "Youth League Forum" 
  | "Women Leaders Baraza" 
  | "Bodaboda Convoy";

export type ActivityStatus = "Scheduled" | "In Progress" | "Completed" | "Postponed";

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  subCounty: SubCounty;
  ward: string;
  venue: string;
  date: string; // YYYY-MM-DD
  time: string;
  coordinator: string;
  expectedAttendance: number;
  actualAttendance: number;
  status: ActivityStatus;
  budgetEstKES: number;
  soundSystemBooked: boolean;
  securityClearance: boolean;
  notes: string;
}

export type TaskPriority = "Critical" | "High" | "Medium" | "Low";
export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskDepartment = "Field Operations" | "Logistics & Sound" | "Media & Comms" | "Legal & Permits" | "Youth Mobilization" | "Finance";

export interface CampaignTask {
  id: string;
  title: string;
  department: TaskDepartment;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string;
  subCounty: SubCounty;
  ward?: string;
  notes?: string;
}

export type IssueCategory = 
  | "Water & Boreholes" 
  | "Roads & Feeder Bridges" 
  | "Health Clinics" 
  | "Tea & Agriculture Markets" 
  | "Youth & TVET Skills" 
  | "Bodaboda Sheds & Lighting" 
  | "Security & Education";

export type IssueSeverity = "Urgent" | "Moderate" | "Advisory";
export type IssueStatus = "Logged" | "Under Assessment" | "Investigating" | "Manifesto Pledge" | "Community Action Taken";

export interface CommunityIssue {
  id: string;
  title: string;
  category: IssueCategory;
  subCounty: SubCounty;
  ward: string;
  villageOrMarket: string;
  severity: IssueSeverity;
  status: IssueStatus;
  dateReported: string;
  reportedBy: string;
  affectedHouseholds: number;
  summary: string;
  campaignResponsePlan: string;
}

export type TeamRole = 
  | "Campaign Director" 
  | "Deputy Director / Strategy" 
  | "Head of Field Mobilization" 
  | "Sub-County Coordinator" 
  | "Youth League Mobilizer" 
  | "Women League Coordinator" 
  | "Communications Lead" 
  | "Logistics & Transport Marshal";

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  subCounty: SubCounty;
  assignedWards: string[];
  phone: string;
  email: string;
  volunteersLed: number;
  status: "Active Field" | "Headquarters" | "On Call";
  joinedDate: string;
}

export interface CampaignStats {
  targetVoters: number;
  mobilizedVoters: number;
  daysToElection: number;
  budgetSpentPercentage: number;
  totalActivitiesCount: number;
  pendingTasksCount: number;
  urgentIssuesCount: number;
  activeVolunteers: number;
}
