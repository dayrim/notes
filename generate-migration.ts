import { exec } from "child_process";

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Error: Please provide a migration name.");
  process.exit(1);
}

const command = `npm run typeorm -- migration:generate ./src/database/migrations/${migrationName}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${stderr}`);
    process.exit(1);
  }
  console.log(stdout);
});
