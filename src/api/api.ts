// import { EOrderStatus } from "@/utils/enum";
import { request } from "./";

interface GetGoodsParams {
  lang: string;
  status: number;
}

/**
 *  获取商品信息列表
 */
export async function getGoodsList(params: GetGoodsParams) {
  const res = await request("/tc_api/Api/Index/goodsListAndService", {
    method: "post",
    data: params,
  });
  return res;
}

// method: 'get',
// params: { id: 1 },
// const getDatas = async (keywords: string) => {
//   const res = await fetchCourseList(keywords);
//   if (res) {
//     setDatas(res.datas);
//   }
// };
