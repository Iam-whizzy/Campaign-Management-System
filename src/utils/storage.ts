import { Activity, CampaignTask, CommunityIssue, TeamMember } from "../types/campaign";
import {
  INITIAL_ACTIVITIES,
  INITIAL_TASKS,
  INITIAL_COMMUNITY_ISSUES,
  INITIAL_TEAM_MEMBERS,
  DEFAULT_CAMPAIGN_PROFILE,
} from "../data/mockData";

const STORAGE_KEYS = {
  ACTIVITIES: "ccm_activities_v1",
  TASKS: "ccm_tasks_v1",
  ISSUES: "ccm_community_issues_v1",
  TEAM: "ccm_team_members_v1",
  PROFILE: "ccm_campaign_profile_v1",
};

export const loadStoredActivities = (): Activity[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : INITIAL_ACTIVITIES;
  } catch (e) {
    console.error("Failed to load activities from storage", e);
    return INITIAL_ACTIVITIES;
  }
};

export const saveStoredActivities = (activities: Activity[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  } catch (e) {
    console.error("Failed to save activities", e);
  }
};

export const loadStoredTasks = (): CampaignTask[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : INITIAL_TASKS;
  } catch (e) {
    console.error("Failed to load tasks from storage", e);
    return INITIAL_TASKS;
  }
};

export const saveStoredTasks = (tasks: CampaignTask[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks", e);
  }
};

export const loadStoredIssues = (): CommunityIssue[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ISSUES);
    return data ? JSON.parse(data) : INITIAL_COMMUNITY_ISSUES;
  } catch (e) {
    console.error("Failed to load community issues from storage", e);
    return INITIAL_COMMUNITY_ISSUES;
  }
};

export const saveStoredIssues = (issues: CommunityIssue[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(issues));
  } catch (e) {
    console.error("Failed to save issues", e);
  }
};

export const loadStoredTeam = (): TeamMember[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TEAM);
    return data ? JSON.parse(data) : INITIAL_TEAM_MEMBERS;
  } catch (e) {
    console.error("Failed to load team from storage", e);
    return INITIAL_TEAM_MEMBERS;
  }
};

export const saveStoredTeam = (team: TeamMember[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  } catch (e) {
    console.error("Failed to save team", e);
  }
};

export const loadStoredProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : DEFAULT_CAMPAIGN_PROFILE;
  } catch (e) {
    return DEFAULT_CAMPAIGN_PROFILE;
  }
};

export const saveStoredProfile = (profile: typeof DEFAULT_CAMPAIGN_PROFILE) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile", e);
  }
};

export const resetAllCampaignData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.ISSUES);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  } catch (e) {
    console.error("Failed to reset storage", e);
  }
};
