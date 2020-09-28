import {
  GET_TRACKS,
  ADD_TRACK,
  DELETE_TRACK,
  UPDATE_TRACK,
  SET_ACTIVE_ACTIVITY,
  SET_ACTIVITY_DURATION,
  SET_ACTIVE_ACTIVITY_START,
} from "./actionTypes";
import axios from "axios";

export const getTracks = () => (dispatch) => {
  axios.get("/api/tracks").then((res) =>
    dispatch({
      type: GET_TRACKS,
      payload: res.data,
    })
  );
};

export const deleteTrack = (id) => (dispatch) => {
  axios.delete(`/api/tracks/${id}`).then((res) =>
    dispatch({
      type: DELETE_TRACK,
      payload: id,
    })
  );
};

export const addTrack = (track) => (dispatch) => {
  axios.post("/api/tracks", track).then((res) =>
    dispatch({
      type: ADD_TRACK,
      payload: res.data,
    })
  );
};

export const updateTrack = (id, updatedTrack) => (dispatch) => {
  axios.put(`/api/tracks/${id}`, updatedTrack).then((res) =>
    dispatch({
      type: UPDATE_TRACK,
      payload: res.data,
    })
  );
};

export const setActiveActivity = (activity) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_ACTIVITY,
    payload: activity,
  });
};

export const setActivityDuration = (duration) => (dispatch) => {
  dispatch({
    type: SET_ACTIVITY_DURATION,
    payload: duration,
  });
};

export const setActiveActivityStart = (date) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_ACTIVITY_START,
    payload: date,
  });
};
