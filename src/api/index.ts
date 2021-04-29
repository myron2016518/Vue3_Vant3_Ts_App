import { extend } from "umi-request";
import { Notify } from "vant";

type CodeMsg = {
  [key: number]: string;
};
// 定义一些常用的http状态码的返回消息
const codeMessage: CodeMsg = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

// 全局的错误处理器函数，只需要判断response有没有值即可
// 其实这里还可以进行更细粒度的处理，例如判断status 的值也就是http状态码，例如404
// 跳转到404页面 或者401 等等,可以从umi中 引history进行一些路由的跳转处理
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    // 危险通知
    Notify({
      type: "danger",
      message: `请求错误 ${status}:${url}，${errorText}`,
    });
    // if (status === 401) {
    //   notification.error({
    //     message: `登录已过期，请重新登录`,
    //     duration: 2,
    //   });
    //   history.push("/");
    //   return;
    // }
  } else if (!response) {
    // 危险通知
    Notify({
      type: "danger",
      message: `网络发生异常 无法连接服务器`,
    });
  }
  return response;
};

const request = extend({
  prefix: "/api/",
  timeout: 15000,
  errorHandler,
  credentials: "include", // 是否携带cookie  include为携带
});

/* 定义请求的拦截器，这里是简单的版本实际上jwt的token直接存到localStorage里是不
安全的存在xss攻击等可能性，存在cookie呢又会有一些Csrf攻击的问题，所以一种办法
是将token拆成三部分分开存，在请求的时候可以在这里进行合并然后放到Authorization里 */
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem("xxx-token");
  if (token) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      Authorization: token,
    };
    return { url, options: { ...options, headers } };
  }
  return { url, options };
});

// 响应的拦截器就是通过判断后端传的code参数一般是业务逻辑的状态码
request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  if (res.code === 1000) {
    return response;
  } else {
    Notify({
      type: "danger",
      message: res.msg || "请求错误,网络发生异常无法连接服务器",
    });

    return response;
  }
});

export { request };
