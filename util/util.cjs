const path = require("path");
const { spawn } = require("child_process");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const envrcFile = path.join(__dirname, "../.env");
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

const electricUrl = process.env.VITE_ELECTRIC_URL;
const proxyPassword = process.env.PROXY_PASSWORD;
const proxyPort = process.env.ELECTRIC_PROXY_PORT;
const proxyHost = process.env.PROXY_HOST;
const proxyUrl = `postgresql://prisma:${proxyPassword}@${proxyHost}:${proxyPort}/electric`;

function electricSqlGenerate(userArgs, callback) {
  const args = [
    "generate",
    "--service",
    electricUrl,
    "--proxy",
    proxyUrl,
    ...userArgs,
  ];
  const proc = spawn("electric-sql", args, { stdio: "inherit" });
  if (callback) {
    proc.on("exit", callback);
  }
}
exports.dockerCompose = dockerCompose;
exports.electricSqlGenerate = electricSqlGenerate;
