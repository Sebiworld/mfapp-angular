import { ApiUser } from "@models/api-user.model";

export interface ApiCalendarEvent {
  id: string;
  title: string;
  description?: string;
  created: number;
  created_user: ApiUser;
  modified: number;
  modified_user: ApiUser;
};
