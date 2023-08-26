import { createSelector } from '@ngrx/store';
import { each as _each } from 'lodash-es';

import { ApiProject, Project } from '@models/api-project.model';

import * as AuthSelectors from './auth.selectors';

const prepareProject = (project: ApiProject): Project => {
  if (!project?.theme || typeof project.theme !== 'object') {
    return project;
  }

  const projectStyles = {};
  for (const key in project.theme) {
    const value = project.theme?.[key];
    if (value === undefined) { continue; }
    if (key.startsWith('--primary')) {
      projectStyles['--project' + key.substring(9)] = value;
      continue;
    }
    projectStyles[key] = value;
  }

  return {
    ...project,
    projectStyles
  };
};

export const selectProjects = createSelector(
  AuthSelectors.selectProjects,
  projects => {
    if (!projects || typeof projects !== 'object') {
      return {};
    }
    const output = {
      ...projects
    };
    Object.keys(output).forEach(function (key, index) {
      if (!output?.[key]?.id) { return; }
      output[key] = prepareProject(output[key]);
    });
    return output;
  }
);