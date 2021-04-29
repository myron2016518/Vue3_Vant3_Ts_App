import { RootState, UserState } from "../types/store";
import { TodoItem } from "../types/todo-list";

export default {
  updateLang(state: RootState, payload: any) {
    state.lang = payload;
  },
  updateGoodsList(state: RootState, payload: any) {
    state.goodsList = payload;
  },
  updateCurGood(state: RootState, payload: any) {
    state.curGood = payload;
  },

  updateUserInfo(state: RootState, payload: UserState) {
    state.userInfo = payload;
  },
  addTodoListItem(state: RootState, payload: TodoItem) {
    const { key } = payload;
    state.todoList.push(payload);
    // 新增条目时，以 key 创建一个字典项，用于快速查找对应条目
    // state.todoListMap[key] = payload;
  },
  removeTodoListItem(state: RootState, index: number) {
    const { key } = state.todoList[index];
    // state.todoListMap[key] = null;
    state.todoList.splice(index, 1);
  },
};
