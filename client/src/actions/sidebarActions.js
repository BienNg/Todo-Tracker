import { GET_SIDEBAR_ACTIVE, TOOGLE_SIDEBAR } from "./actionTypes";

export const getSidebarActive = () => {
  return {
    type: GET_SIDEBAR_ACTIVE,
  };
};

export const toggleSidebar = () => {
  return {
    type: TOOGLE_SIDEBAR,
  };
};
