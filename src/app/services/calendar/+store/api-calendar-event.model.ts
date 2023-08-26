import { ApiProject, Project } from "@models/api-project.model";
import { ApiUser } from "@models/api-user.model";

export interface ApiCalendarEvent {
  id?: string;
  title?: string;
  description?: string;
  created?: number;
  created_user?: ApiUser;
  modified?: number;
  modified_user?: ApiUser;
  project_id?: number;
  timespans: ApiCalendarTimespan[];
  saveable?: boolean;
  deletable?: boolean;
};

export interface ApiCalendarTimespan {
  id?: string;
  title?: string;
  description?: string;
  participants?: string;
  timeFrom: number;
  timeUntil: number;
  created?: number;
  created_user?: ApiUser;
  modified?: number;
  modified_user?: ApiUser;
}

export interface CalendarEvent extends ApiCalendarEvent {
  project?: Project;
}