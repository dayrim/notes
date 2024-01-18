import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  content!: string;
}
