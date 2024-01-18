import { DataSource } from "typeorm";
import sqliteConnection from "./local-database-connection";
import { Note } from "../entities/note";
import { Note1704840514710 } from "./migrations/1704840514710-Note";

export default new DataSource({
  name: "connection",
  type: "capacitor",
  driver: sqliteConnection,
  database: "notes-db",
  entities: [Note],
  migrations: [Note1704840514710],
  logging: ["error", "query", "schema"],
  synchronize: false,
  migrationsRun: false,
});
