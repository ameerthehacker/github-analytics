import { Migration } from 'mikro-orm';

export class Migration20200809100452 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" varchar(255) not null, "full_name" varchar(255) not null, "password" varchar(255) not null);'
    );
    this.addSql(
      'alter table "user" add constraint "user_pkey" primary key ("id");'
    );
  }

  async down() {
    this.addSql('drop table "user"');
  }
}
