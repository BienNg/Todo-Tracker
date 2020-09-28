import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  TODOS_LOADING,
} from "../actions/actionTypes";

const initialState = {
  todos: [],
  loading: false,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? (todo = action.payload) : todo
        ),
      };
    case TODOS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
