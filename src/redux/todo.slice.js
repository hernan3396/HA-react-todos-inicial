import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const getNextId = (items) =>
  items.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      return {
        ...state,
        items: [
          ...state.items,
          {
            text: action.payload,
            completed: false,
            id: getNextId(state.items),
          },
        ],
      };
    },
    deleteTodo(state, action) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    },
    checkTodo(state, action) {
      const item = state.items.find((todo) => todo.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
    fetchTodosStart(state, action) {
      state.loading = true;
    },
    fetchTodosSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchTodosError(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  checkTodo,
  fetchTodosStart,
  fetchTodosError,
  fetchTodosSuccess,
} = todoSlice.actions;

export const fetchTodos = () => {
  return async function (dispatch) {
    dispatch(fetchTodosStart());
    try {
      const response = await axios.get("http://localhost:3004/todos");
      dispatch(fetchTodosSuccess(response.data));
    } catch (error) {
      dispatch(fetchTodosError(error.message));
    }
  };
};

export default todoSlice.reducer;
