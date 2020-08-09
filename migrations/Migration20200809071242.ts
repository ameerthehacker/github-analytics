import { Migration } from 'mikro-orm';

export class Migration20200809071242 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "full_name" varchar(255) not null, "password" varchar(255) not null);');
  }

  async down() {
    this.addSql('drop table "user"');
  }
}
