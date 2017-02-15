import * as types from "../constants/Projects";

export function requestGetUserProjects(value) {
  return { type: types.REQUEST_USER_PROJECTS, value };
}

export function requestGetUserProject(value) {
  return { type: types.REQUEST_USER_PROJECT, value };
}

export function setUserProject(value) {
  return { type: types.SET_USER_PROJECT, value };
}

export function setUserProjectDevEnvironment(value) {
  return { type: types.SET_USER_PROJECT_DEV_ENVIRONMENT, value };
}

export function setUserProjects(value) {
  return { type: types.SET_USER_PROJECTS, value };
}
