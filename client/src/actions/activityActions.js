import {
  GET_ACTIVITIES,
  ADD_ACTIVITY,
  DELETE_ACTIVITY,
  UPDATE_ACTIVITY,
  SET_ACTIVITY_MODAL_STATE,
  UPDATE_ACTIVITY_MODAL_INPUT,
  SET_TEMP_START,
  SET_TEMP_END,
  SET_ACTIVITY_TRACK_MODAL_STATE,
  SET_ACTIVE_DATE,
  SET_SELECTED_TRACK,
} from "./actionTypes";
import axios from "axios";

export const getActivities = () => (dispatch) => {
  axios.get("/api/activities").then((res) =>
    dispatch({
      type: GET_ACTIVITIES,
      payload: res.data,
    })
  );
};

export const deleteActivity = (id) => (dispatch) => {
  axios.delete(`/api/activities/${id}`).then((res) =>
    dispatch({
      type: DELETE_ACTIVITY,
      payload: id,
    })
  );
};

export const addActivity = (activity) => (dispatch) => {
  axios.post("/api/activities", activity).then((res) =>
    dispatch({
      type: ADD_ACTIVITY,
      payload: res.data,
    })
  );
};

export const updateActivity = (id, updatedActivity) => (dispatch) => {
  axios.put(`/api/activities/${id}`, updatedActivity).then((res) =>
    dispatch({
      type: UPDATE_ACTIVITY,
      payload: res.data,
    })
  );
};

export const setActivityModalState = (state) => (dispatch) => {
  dispatch({
    type: SET_ACTIVITY_MODAL_STATE,
    payload: state,
  });
};
export const updateActivityModalInput = (input) => (dispatch) => {
  dispatch({
    type: UPDATE_ACTIVITY_MODAL_INPUT,
    payload: input,
  });
};

export const setTempStartCell = (tempStartCell) => (dispatch) => {
  dispatch({
    type: SET_TEMP_START,
    payload: tempStartCell,
  });
};
export const setTempEndCell = (tempEndCell) => (dispatch) => {
  dispatch({
    type: SET_TEMP_END,
    payload: tempEndCell,
  });
};

export const setActivityTrackModalState = (state) => (dispatch) => {
  dispatch({
    type: SET_ACTIVITY_TRACK_MODAL_STATE,
    payload: state,
  });
};

export const setActiveDate = (date) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_DATE,
    payload: date,
  });
};

export const setSelectedTrack = (trackId) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_TRACK,
    payload: trackId,
  });
};
