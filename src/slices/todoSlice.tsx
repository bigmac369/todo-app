import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { todoInfo } from "../components/TodoList";

type ArrayState = {
  todoList: todoInfo[];
  todoListStatus: string;
};

// Function to get the initial todo list from local storage, if there is none, return an empty array
// const getTodoListFromLocalStorage = (): todoInfo[] => {
//   const localTodoData = localStorage.getItem("todoList");
//   if (!localTodoData) {
//     localStorage.setItem("todoList", JSON.stringify([]));
//     return [];
//   } else {
//     return JSON.parse(localTodoData);
//   }
// };

const initialValue: ArrayState = {
  todoList: [
    {
      id: "1",
      text: "Learn Reactjs",
      completed: true,
      formattedTime: new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      }),
      formattedDate: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    },
  ],
  todoListStatus: "all",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action: PayloadAction<todoInfo>) => {
      state.todoList.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
    updateTodo: (state, action: PayloadAction<todoInfo>) => {
      const { id, text } = action.payload;
      const existingTodo = state.todoList.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const selectedTodo = state.todoList.find((todo) => {
        return todo.id === action.payload; //must use "return" keyword if its not returning 1 line of code otherwise code break
      });
      if (selectedTodo) {
        selectedTodo.completed = !selectedTodo.completed;
      }
    },
    updateTodoListStatus: (state, action: PayloadAction<string>) => {
      state.todoListStatus = action.payload;
    },
  },
});

//Selectors
// export const selectTodoList = (state: Rootstate) => state.todo.todoList;
// console.log(selectTodoList);

// Actions
export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
  updateTodoListStatus,
} = todoSlice.actions;

// Reducer
export default todoSlice.reducer;
