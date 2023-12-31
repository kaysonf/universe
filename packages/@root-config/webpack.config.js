const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { decodeImportMap } = require("../../devServerUtils");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "universe";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // devServer: {
    //   devMiddleware: {
    //     writeToDisk: true,
    //   },
    // },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
          importmap: decodeImportMap(webpackConfigEnv.IMPORT_MAP),
        },
      }),
    ],
  });
};
