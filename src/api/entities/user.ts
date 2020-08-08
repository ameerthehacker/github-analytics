import { Entity, PrimaryKey } from "mikro-orm";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;
  fullName: string;
  password: string;
}