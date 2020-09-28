import {
  SET_PROJECT_MODAL_STATE,
  UPDATE_MODAL_INPUT,
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
  UPDATE_PROJECT,
  SET_ACTIVE_PROJECT,
  SET_PROJECT_COLOR,
} from "./actionTypes";

import axios from "axios";

export const setProjectModalState = (state) => (dispatch) => {
  dispatch({
    type: SET_PROJECT_MODAL_STATE,
    payload: state,
  });
};
export const updateModalInput = (input) => (dispatch) => {
  dispatch({
    type: UPDATE_MODAL_INPUT,
    payload: input,
  });
};

export const getProjects = () => (dispatch) => {
  dispatch(setProjectsLoading());
  axios.get("/api/projects").then((res) =>
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  );
};

export const deleteProject = (id) => (dispatch) => {
  axios.delete(`/api/projects/${id}`).then((res) =>
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    })
  );
};

export const addProject = (project) => (dispatch) => {
  axios.post("/api/projects", project).then((res) =>
    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    })
  );
};

export const updateProject = (id, updatedProject) => (dispatch) => {
  axios.put(`/api/projects/${id}`, updatedProject).then((res) =>
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    })
  );
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};

export const setActiveProject = (projectId) => {
  return {
    type: SET_ACTIVE_PROJECT,
    payload: projectId,
  };
};

export const setProjectColor = (color) => {
  return {
    type: SET_PROJECT_COLOR,
    payload: color,
  };
};
