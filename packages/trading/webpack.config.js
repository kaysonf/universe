const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "universe",
    projectName: "trading",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
      ...defaultConfig.output,
      clean: true,
    },
    // devServer: {
    //   devMiddleware: {
    //     writeToDisk: true,
    //   },
    // },

    // plugins: [
    //   {
    //     apply: (compiler) => {
    //       compiler.hooks.done.tap('WaitForCompilationPlugin', (stats) => {
    //         // Your code here
    //         fs.watch('./dist', (eventType, filename) => {
    //           // Handle the file or folder change event here
    //           console.log(`Event type: ${eventType}`);
    //           console.log(`Filename: ${filename}`);
    //         });

    //         console.log('Webpack compilation finished');
    //       });
    //     },
    //   },
    // ]
  });
};
