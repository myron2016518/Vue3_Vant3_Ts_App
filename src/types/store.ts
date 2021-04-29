import { TodoItem } from "./todo-list";

// 用户信息
export interface UserState {
  user: string;
  password: string;
}

export interface RootState {
  userInfo: UserState;
  todoList: Array<TodoItem>;
  todoListMap: object;
  goodsList: any;
  curGood: any;
  lang: string;
}
