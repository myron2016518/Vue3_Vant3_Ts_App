// state.ts
import { RootState } from "../types/store";
import { TodoItem } from "../types/todo-list";

const state: RootState = {
  userInfo: {
    user: "",
    password: "",
  },
  todoList: [] as Array<TodoItem>,
  todoListMap: {},
  goodsList: [] as any,
  curGood: [] as any,
  lang: sessionStorage.lang || "en",
};

export default state;
