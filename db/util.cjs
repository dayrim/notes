const shell = require("shelljs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

shell.config.silent = true; // don't log output of child processes

// If we are running the docker compose file,
// the container running `electric` service will be exposing
// the proxy port which should be used for all DB connections
// that intend to use the DDLX syntax extension of SQL.

const appName = process.env.APP_NAME;
const proxyPort = process.env.ELECTRIC_PROXY_PORT;
const dbUser = process.env.POSTGRES_USER;
const proxyPassword = process.env.PROXY_PASSWORD;

// URL to use when connecting to the proxy from the host OS
const DATABASE_URL = buildDatabaseURL(
  dbUser,
  proxyPassword,
  "localhost",
  proxyPort,
  appName
);

console.log(DATABASE_URL, "DATABASE_URL");
// URL to use when connecting to the proxy from a Docker container. This is used when `psql` is exec'd inside the
// `postgres` service's container to connect to the poxy running in the `electric` service's container.
const CONTAINER_DATABASE_URL = buildDatabaseURL(
  dbUser,
  proxyPassword,
  "electric",
  65432,
  appName
);
console.log(CONTAINER_DATABASE_URL, "CONTAINER_DATABASE_URL");
// URL to display in the terminal for informational purposes. It omits the password but is still a valid URL that can be
// passed to `psql` running on the host OS.
const PUBLIC_DATABASE_URL = buildDatabaseURL(
  dbUser,
  null,
  "localhost",
  proxyPort,
  appName
);

function buildDatabaseURL(user, password, host, port, dbName) {
  let url = "postgresql://" + user;
  if (password) {
    url += ":" + password;
  }
  url += "@" + host + ":" + port + "/" + dbName;
  return url;
}

exports.DATABASE_URL = DATABASE_URL;
exports.CONTAINER_DATABASE_URL = CONTAINER_DATABASE_URL;
exports.PUBLIC_DATABASE_URL = PUBLIC_DATABASE_URL;
