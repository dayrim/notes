const { electricSqlGenerate } = require("../util/util.cjs");
const process = require("process");

const cliArguments = process.argv.slice(2);

electricSqlGenerate(cliArguments, (code) => {
  if (code !== 0) {
    console.error(
      "\x1b[31m",
      "Failed to run the electric-sql generate. Check the output from `electric-sql generate` above.\n" +
        "\x1b[0m"
    );
  }
});
