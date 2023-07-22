const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

function createEntry(dirNames) {
  return dirNames.reduce((entries, currentDir) => {
    entries[currentDir] = path.resolve(__dirname, `src/${currentDir}`);
    return entries;
  }, {});
}

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "IGNORED",
    projectName: "IGNORED",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: createEntry(["application", "utils", "components"]),
    output: {
      filename: "universe-shared-[name].js",
      libraryTarget: "system",
      path: path.resolve(__dirname, "dist"),
      uniqueName: "shared-[name]",
      devtoolNamespace: "shared-[name]",
      publicPath: "",
      clean: true,
    },
  });
};
