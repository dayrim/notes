import { MigrationInterface, QueryRunner } from "typeorm";

export class Note1704840514710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "note" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" VARCHAR NOT NULL,
                "content" TEXT NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "note";
        `);
  }
}
