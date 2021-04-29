module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // "dynamic-import-node",

    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
};
