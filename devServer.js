const fs = require('fs');
const glob = require('glob');
const concurrently = require('concurrently');
const portfinder = require('portfinder');

// fs.watch('./packages/@shell/dist', (eventType, filename) => {
//   // Handle the file or folder change event here
//   console.log(`Event type: ${eventType}`);
//   console.log(`Filename: ${filename}`);
// });

// glob to find frontend packages
// glob('packages/**/dist', (err, folders) => {
//   if (err) {
//     console.error('Error:', err);
//     return;
//   }

//   // The `folders` array will contain the matching folder paths
//   console.log('Matched folders:', folders);
// });


const WORKSPACES_WITH_FRONTEND_CODE = [
  '@universe/shell',
  '@universe/examples',
]

function createStartCommand(params) {
  return `yarn workspace ${params.workspace} start --port ${params.port}`
}

async function main() {
  const commands = [
    'yarn workspace @universe/root-config start'
  ];

  let minPort = 3000;

  for (const workspace of WORKSPACES_WITH_FRONTEND_CODE) {
    try {
      const port = await portfinder.getPortPromise({port: minPort});
      commands.push(createStartCommand({workspace, port}));
      minPort = port + 1;
    } catch (err) {
      console.error(err);
    }
  }

  const  { result } = concurrently(commands, {
    killOthers: ['failure'],
  });

  result.then(() =>  console.log('All dev servers stopped'))
}

main();

