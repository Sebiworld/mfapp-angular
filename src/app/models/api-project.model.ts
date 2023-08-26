export interface ApiProject {
  id: number;
  name: string;
  title: string;
  created: number;
  modified: number;
  url: string;
  httpUrl: string;
  theme?: { [key: string]: any };
};

export interface Project extends ApiProject {
  projectStyles?: { [key: string]: any };
}