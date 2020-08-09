import { Entity, PrimaryKey, Property } from "mikro-orm";

@Entity()
export class User {
  constructor(fullName: string, password: string) {
    this.fullName = fullName;
    this.password = password;
  }

  @PrimaryKey()
  id!: number;
  @Property()
  fullName!: string;
  @Property()
  password!: string;
}