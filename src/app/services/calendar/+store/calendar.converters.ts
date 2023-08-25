import { Converters } from "@shared/converters/converters";
import { isValidArray } from "@shared/helpers/general.helpers";
import { UserConverters } from "@shared/converters/user-converters";

import { ApiCalendarEvent, ApiCalendarTimespan } from "./api-calendar-event.model";

const convertEvents = (data: any[]): ApiCalendarEvent[] => {
  if (!isValidArray(data)) { return undefined; }
  return data.map(event => convertEvent(event)).filter(event => isEventValid(event));
};

const convertEvent = (data: any): ApiCalendarEvent => {
  const event: ApiCalendarEvent = {
    ...data,
    title: Converters.parseStringData(data?.title || ''),
    description: Converters.parseStringData(data?.description || ''),
    created: Converters.parseDateData(data?.created, 'server'),
    created_user: UserConverters.convertUserData(data?.created_user),
    modified: Converters.parseDateData(data?.modified, 'server'),
    modified_user: UserConverters.convertUserData(data?.modified_user),
    timespans: [],
    saveable: Converters.parseBooleanData(data?.saveable),
    deletable: Converters.parseBooleanData(data?.deletable)
  };

  if (isValidArray(data?.timespans)) {
    event.timespans = data.timespans.map(timespan => convertTimespan(timespan)).filter(timespan => isTimespanValid(timespan));
  }

  if (!isEventValid(event)) {
    return undefined;
  }

  return event;
};

const isEventValid = (data: any): boolean => !!data?.id && !!data?.timespans?.length;

const convertTimespan = (data: any): ApiCalendarTimespan => {
  const timespan: ApiCalendarTimespan = {
    ...data,
    timeFrom: Converters.parseDateData(data?.timeFrom, 'server'),
    timeUntil: Converters.parseDateData(data?.timeUntil, 'server'),
    title: Converters.parseStringData(data?.title || ''),
    description: Converters.parseStringData(data?.description || ''),
    participants: Converters.parseStringData(data?.participants || ''),
    created: Converters.parseDateData(data?.created, 'server'),
    created_user: UserConverters.convertUserData(data?.created_user),
    modified: Converters.parseDateData(data?.modified, 'server'),
    modified_user: UserConverters.convertUserData(data?.modified_user)
  };

  if (!isTimespanValid(timespan)) {
    return undefined;
  }

  return timespan;
};

const isTimespanValid = (data: any): boolean => !!data?.timeFrom && !!data?.timeUntil;

export const CalendarConverters = {
  convertEvents, convertEvent, isEventValid, convertTimespan, isTimespanValid
};