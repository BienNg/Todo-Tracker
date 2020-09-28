import axios from "axios";
import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  TODOS_LOADING,
  UPDATE_TODO,
} from "./actionTypes";

export const getTodos = () => (dispatch) => {
  dispatch(setTodosLoading());
  axios.get("/api/tasks").then((res) =>
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    })
  );
};

export const deleteTodo = (id) => (dispatch) => {
  axios.delete(`/api/tasks/${id}`).then((res) =>
    dispatch({
      type: DELETE_TODO,
      payload: id,
    })
  );
};

export const addTodo = (todo) => (dispatch) => {
  axios.post("/api/tasks", todo).then((res) =>
    dispatch({
      type: ADD_TODO,
      payload: res.data,
    })
  );
};

export const updateTodo = (id, updatedTodo) => (dispatch) => {
  axios.put(`/api/tasks/${id}`, updatedTodo).then((res) =>
    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    })
  );
};

export const setTodosLoading = () => {
  return {
    type: TODOS_LOADING,
  };
};
