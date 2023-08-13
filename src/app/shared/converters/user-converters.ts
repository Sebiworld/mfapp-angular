import { isValidArray } from "@shared/helpers/general.helpers";

import { ApiPermission, ApiRole, ApiUser } from "@models/api-user.model";

import { Converters } from "./converters";

const convertUserData = (data: any): ApiUser => {
  const user: ApiUser = {
    ...data,
    name: Converters.parseStringData(data?.name || ''),
    email: Converters.parseStringData(data?.email || '')
  };

  if (isValidArray(data?.permissions)) {
    user.permissions = data.permissions.map(permission => convertPermissionData(permission));
  }

  if (isValidArray(data?.roles)) {
    user.roles = data.roles.map(role => convertRoleData(role));
  }

  if (!user?.name) {
    return undefined;
  }
  return user;
};

const convertPermissionData = (data: any): ApiPermission => ({
  ...data,
  name: Converters.parseStringData(data?.name || ''),
  title: Converters.parseStringData(data?.title || '')
});

const convertRoleData = (data: any): ApiRole => ({
  ...data,
  name: Converters.parseStringData(data?.name || ''),
  title: Converters.parseStringData(data?.title || ''),
  description: Converters.parseStringData(data?.description || '')
});

export const UserConverters = {
  convertUserData, convertPermissionData, convertRoleData
};