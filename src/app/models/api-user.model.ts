export interface ApiPermission {
  id: number;
  name: string;
  title: string;
};

export interface ApiRole {
  id: number;
  name: string;
  title: string;
  description: string;
};

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  roles: ApiRole[];
  permissions: ApiPermission[];
};
