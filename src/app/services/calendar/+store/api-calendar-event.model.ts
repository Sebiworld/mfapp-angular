import { ApiProject } from "@models/api-project.model";
import { ApiUser } from "@models/api-user.model";

export interface ApiCalendarEvent {
  id?: string;
  title?: string;
  description?: string;
  created?: number;
  created_user?: ApiUser;
  modified?: number;
  modified_user?: ApiUser;
  project?: ApiProject;
  timespans: ApiCalendarTimespan[];
  saveable?: boolean;
  deletable?: boolean;
};

export interface ApiCalendarTimespan {
  id?: string;
  title?: string;
  description?: string;
  timeFrom: number;
  timeUntil: number;
  created?: number;
  created_user?: ApiUser;
  modified?: number;
  modified_user?: ApiUser;
}