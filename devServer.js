import { exec } from "child_process";

async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  let { stdout } = await sh("yarn workspaces list --verbose");
  const workspaceCount = stdout
    .split("\n")
    .filter((l) => l.includes("packages")).length;
  console.log(workspaceCount);
  for (let line of stdout.split("\n")) {
    console.log(`ls: ${line}`);
  }
}

main();
