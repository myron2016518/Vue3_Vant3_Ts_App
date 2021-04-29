const {
  html: { title },
} = require("./package.json");
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
  publicPath: "./",

  devServer: {
    port: "8110",
    proxy: {
      // "/SmartLink": {
      //   // target: "http://aittest.x431.com:8000/"
      //   target: "https://ait.x431.com",//正式
      // },

      "/tc_api": {
        target: "http://tapi.mythinkcar.com/",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/tc_api": "" },
      },
    },
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = title;
      return args;
    });
    config.resolve.alias.set(
      "vue-i18n",
      "vue-i18n/dist/vue-i18n.cjs.js"
      // "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js"
    );

    // config.module
    //   .rule("ts")
    //   .use("ts-loader")
    //   .tap((options) => {
    //     options = merge(options, {
    //       happyPackMode: true,
    //       transpileOnly: true,
    //       getCustomTransformers: () => ({
    //         before: [
    //           tsImportPluginFactory({
    //             libraryName: "vant",
    //             libraryDirectory: "es",
    //             // 这句必须加上，不然修改主题没有效果
    //             style: (name) => `${name}/style/less`,
    //           }),
    //         ],
    //       }),
    //       compilerOptions: {
    //         module: "es2015",
    //       },
    //     });
    //     return options;
    //   });

    config.plugin("prefetch").tap((options) => {
      options[0].fileBlacklist = options[0].fileBlacklist || [];
      options[0].fileBlacklist.push(/lang(.)+?\.js$/);
      options[0].fileBlacklist.push(/lang(.)+?\.js.map$/);
      return options;
    });
  },
};
