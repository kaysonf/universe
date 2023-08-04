// https://github.com/open-cli-tools/concurrently#api
const concurrently = require('concurrently');

const portfinder = require('portfinder');
const {createEncodedImportMap} = require("./devServerUtils");


const WORKSPACES_WITH_FRONTEND_CODE = [
  {package: '@universe/trading', out: './packages/trading/dist'},
]

function createStartCommand(params) {
  return `yarn workspace ${params.workspace} start --port ${params.port} --stats errors-only`
}

function createCleanCommand(location) {
  return `rm -rf ${location}`;
}

let startingPort = 8999;
function nextPort() {
  return ++startingPort;
}

const ROOT_CONFIG_PORT = nextPort();

const SHELL_PORT = nextPort();

const SHARED_PORT = nextPort();

function createConfig(params) {
  const {workspace, systemImportURL, port} = params;

  return {
    importMap: [workspace, systemImportURL],
    command: `yarn workspace ${workspace} start --port ${port} --stats errors-only`
  };
}

/**
 * used by root-config's webpack.config.js envs
 * @returns {string}
 */
function createRootCommand({workspace, port}) {

  const importMap = createEncodedImportMap([
    {workspace: '@universe/root-config', port: ROOT_CONFIG_PORT, name: 'universe-root-config.js'},
    {workspace: '@universe/shell', port: SHELL_PORT, name: 'universe-shell.js'},
    {workspace: '@universe/shared/application', port: SHARED_PORT, name: 'universe-shared-application.js'},
    {workspace: '@universe/shared/utils', port: SHARED_PORT, name: 'universe-shared-utils.js'},
    {workspace: '@universe/shared/components', port: SHARED_PORT, name: 'universe-shared-components.js'},
    {workspace: '@universe/common', port: 4173, name: 'util.cjs'}
  ]);

  return `yarn workspace ${workspace} start --port ${port} --env IMPORT_MAP=${importMap} --stats errors-only`
}

async function main() {


  const startCommands = [
    createRootCommand({workspace: '@universe/root-config', port: ROOT_CONFIG_PORT}),
    createStartCommand({workspace: '@universe/shell', port: SHELL_PORT}),
    createStartCommand({workspace: '@universe/shared', port: SHARED_PORT})
  ];

  let minPort = 3000;

  for (const workspace of WORKSPACES_WITH_FRONTEND_CODE) {
    try {
      const port = await portfinder.getPortPromise({port: minPort});
      
      startCommands.push(createCleanCommand(workspace.out))
      startCommands.push(createStartCommand({workspace: workspace.package, port}));
      // watch(workspace.out);

      
      minPort = port + 1; // avoid webpackdev server port conflict
    } catch (err) {
      console.error(err);
    }
  }

  const  c = concurrently(startCommands, {
    killOthers: ['failure'],
  });

  c.result.then(() =>  console.log('All dev servers stopped'))
}

main();

process.on('SIGINT', () => {
  // console.log(process.exit(0));
})


