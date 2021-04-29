import { createStore } from "vuex";
import state from "./state";
import mutations from "./mutations";
// import actions from "./actions";
import getters from "./getters";
import { getGoodsList } from "@/api/api";

export default createStore({
  state,
  mutations,
  actions: {
    async requestGetGoodsList({ dispatch, commit, state }) {
      const res = await getGoodsList({ lang: state.lang, status: 1 });
      if (res && res.data) {
        commit("updateGoodsList", res.data);
      }
    },
  },
  getters,
});
