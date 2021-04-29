// import { RootState } from "./state";
import { RootState } from "../types/store";
export default {
  lang: (state: RootState) => state.lang,
  userInfo: (state: RootState) => state.userInfo,
  goodsList: (state: RootState) => state.goodsList,
  curGood: (state: RootState) => state.curGood,
};
