import {
  GET_TRACKS,
  ADD_TRACK,
  DELETE_TRACK,
  UPDATE_TRACK,
  SET_ACTIVE_ACTIVITY,
  SET_ACTIVITY_DURATION,
  SET_ACTIVE_ACTIVITY_START,
} from "../actions/actionTypes";

const initialState = {
  tracks: [],
  activeActivity: "",
  duration: "",
  activeActivityStartTime: Date,
};

export const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    case DELETE_TRACK:
      return {
        ...state,
        tracks: state.tracks.filter((track) => track._id !== action.payload),
      };
    case ADD_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
      };
    case UPDATE_TRACK:
      return {
        ...state,
        tracks: state.tracks.map((track) =>
          track._id === action.payload._id ? (track = action.payload) : track
        ),
      };
    case SET_ACTIVE_ACTIVITY:
      return {
        ...state,
        activeActivity: action.payload,
      };
    case SET_ACTIVITY_DURATION:
      return {
        ...state,
        duration: action.payload,
      };
    case SET_ACTIVE_ACTIVITY_START:
      return {
        ...state,
        activeActivityStartTime: action.payload,
      };
    default:
      return state;
  }
};
