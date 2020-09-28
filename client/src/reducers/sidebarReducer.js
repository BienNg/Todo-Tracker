import { GET_SIDEBAR_ACTIVE, TOOGLE_SIDEBAR } from "../actions/actionTypes";

const initialState = {
  sidebarIsActive: false,
};

export const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIDEBAR_ACTIVE:
      return { ...state };
    case TOOGLE_SIDEBAR:
      return { ...state, sidebarIsActive: !state.sidebarIsActive };
    default:
      return state;
  }
};
