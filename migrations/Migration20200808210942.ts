import { Migration } from 'mikro-orm';

export class Migration20200808210942 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key);');
  }

}
