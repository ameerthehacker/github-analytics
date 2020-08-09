import { connectToDatabase } from '../src/api/db';

connectToDatabase().then(orm => {
  const command = process.argv[2];
  const migrator = orm.getMigrator();

  if (!command) {
    console.log('Available commands create, up, down, list, pending');
    orm.close();

    process.exit(1);
  }

  switch (command) {
    case 'create': {
      migrator.createMigration().then(() => {
        console.log('Migrations created successfully');

        orm.close();
      })
      .catch(() => orm.close());
      break;
    }
    case 'up': {
      migrator.up()
      .then(() => {
        orm.close();

        console.log('Migrations successful!')
      })
      .catch((err) => {
        console.log(err);

        process.exit(1);
      });
      break;
    }
    case 'down': {
      migrator.down()
      .then(() => {
        orm.close();

        console.log('Migrations successful!')
      })
      .catch((err) => {
        console.log(err);

        process.exit(1);
      })
      break;
    }
    case 'list': {
      migrator.getExecutedMigrations().then((migrations) => {
        orm.close();

        if (migrations.length > 0) {
          console.table(migrations);
        } else {
          console.log('No migrations available');
        }
      }).catch(err => {
        console.error(err);

        process.exit(1);
      })
      break;
    }
    case 'pending': {
      migrator.getPendingMigrations().then((migrations) => {
        orm.close();

        if (migrations.length > 0) {
          console.table(migrations);
        } else {
          console.log('No migrations pending');
        }
      }).catch(err => {
        console.error(err);

        process.exit(1);
      })
      break;
    }
    default: {
      console.log(`Unknown command ${command}`);

      process.exit(1);
    }
  }
}).catch(() => process.exit(1));
