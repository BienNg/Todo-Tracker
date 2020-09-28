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
} from "../actions/actionTypes";

const initialState = {
  projectsModalState: false,
  modalInput: "",
  projectColor: "",
  projects: [],
  loading: false,
  activeProject: "",
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_MODAL_STATE:
      return {
        ...state,
        projectsModalState: action.payload,
      };
    case UPDATE_MODAL_INPUT:
      return {
        ...state,
        modalInput: action.payload,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        activeProject: "",
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case UPDATE_PROJECT:
      if (state.todos) {
        return {
          ...state,
          todos: state.todos.map((project) =>
            project._id === action.payload._id
              ? (project = action.payload)
              : project
          ),
        };
      } else {
        return {
          ...state,
        };
      }
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: action.payload,
      };
    case SET_PROJECT_COLOR:
      return {
        ...state,
        projectColor: action.payload,
      };

    default:
      return state;
  }
};
