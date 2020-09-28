import { combineReducers } from "redux";
import { todoReducer } from "./todoReducer";
import { sidebarReducer } from "./sidebarReducer";
import { projectReducer } from "./projectReducer";
import { activityReducer } from "./activityReducer";
import { trackReducer } from "./trackReducer";

export default combineReducers({
  todoReducer: todoReducer,
  sidebarReducer: sidebarReducer,
  projectReducer: projectReducer,
  activityReducer: activityReducer,
  trackReducer: trackReducer,
});
