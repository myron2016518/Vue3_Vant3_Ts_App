import { getGoodsList } from "@/api/api";
export default {
  // initState({ dispatch }) {
  //   dispatch("requestGetGoodsList");
  // },
  async requestGetGoodsList({ dispatch, commit, state }) {
    const res = await getGoodsList({ lang: state.lang, status: 1 });
    if (res && res.data) {
      commit("updateGoodsList", res.data);
    }
  },
};

// const getDatas = async (keywords: string) => {
//   const res = await fetchCourseList(keywords);
//   if (res) {
//     setDatas(res.datas);
//   }
// };
