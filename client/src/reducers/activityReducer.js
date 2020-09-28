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
} from "../actions/actionTypes";

const initialState = {
  activities: [],
  activitiesModalState: false,
  modalInput: "",
  tempStartCell: -1,
  tempEndCell: -1,
  trackModalState: false,
  activeDate: new Date(),
  selectedTrack: "",
};

export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity._id !== action.payload
        ),
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case UPDATE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity._id === action.payload._id
            ? (activity = action.payload)
            : activity
        ),
      };
    case SET_ACTIVITY_MODAL_STATE:
      return {
        ...state,
        activitiesModalState: action.payload,
      };
    case UPDATE_ACTIVITY_MODAL_INPUT:
      return {
        ...state,
        modalInput: action.payload,
      };
    case SET_TEMP_START:
      return {
        ...state,
        tempStartCell: action.payload,
      };
    case SET_TEMP_END:
      return {
        ...state,
        tempEndCell: action.payload,
      };
    case SET_ACTIVITY_TRACK_MODAL_STATE:
      return {
        ...state,
        trackModalState: action.payload,
      };
    case SET_ACTIVE_DATE:
      return {
        ...state,
        activeDate: action.payload,
      };
    case SET_SELECTED_TRACK:
      return { ...state, selectedTrack: action.payload };
    default:
      return state;
  }
};
