import { Entity, PrimaryKey, Property } from 'mikro-orm';
import * as uuid from 'uuid';

@Entity()
export class User {
  constructor(fullName: string, password: string) {
    this.fullName = fullName;
    this.password = password;
  }

  @PrimaryKey()
  id: string = uuid.v1();
  @Property()
  fullName!: string;
  @Property()
  password!: string;
}
