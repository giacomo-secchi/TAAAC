import { ADD_PROJECT } from './actionTypes';

let nextProjectId = 0;
export const addProject = content => ({
  type: ADD_PROJECT,
  payload: {
    id: ++nextProjectId,
    content
  }
});