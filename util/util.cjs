const path = require("path");
const { spawn } = require("child_process");

const envrcFile = path.join(__dirname, "../backend/compose/.envrc");
const composeFile = path.join(
  __dirname,
  "../backend/compose/docker-compose.yaml"
);

function dockerCompose(command, userArgs, callback) {
  const args = [
    "compose",
    "--ansi",
    "always",
    "--env-file",
    envrcFile,
    "-f",
    composeFile,
    command,
    ...userArgs,
  ];
  const proc = spawn("docker", args, { stdio: "inherit" });
  if (callback) {
    proc.on("exit", callback);
  }
}

exports.dockerCompose = dockerCompose;
