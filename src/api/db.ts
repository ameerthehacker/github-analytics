import { MikroORM, IDatabaseDriver, Connection } from 'mikro-orm';
import { User } from './entities/user';
import { load } from 'ts-dotenv';

export function connectToDatabase(): Promise<
  MikroORM<IDatabaseDriver<Connection>>
> {
  const env = load({
    DATABASE_URL: { default: '', type: String },
    DB_HOST: { default: 'pg://localhost', type: String },
    DB_PWD: { default: '', type: String },
    DB_NAME: { default: 'gh-analytics', type: String },
    DB_USERNAME: { default: 'postgres', type: String },
  });

  return new Promise((resolve, reject) => {
    // heroku provides DATABASE_URL. In development we use username, password combo
    const connectionConfig =
      env.DATABASE_URL.length > 0
        ? {
            clientUrl: env.DATABASE_URL,
            migrations: {
              disableForeignKeys: false,
            },
          }
        : {
            dbName: env.DB_NAME,
            clientUrl: env.DB_HOST,
            user: env.DB_USERNAME,
            password: env.DB_PWD,
          };

    MikroORM.init({
      entities: [User],
      type: 'postgresql',
      ...connectionConfig,
    })
      .then((orm) => {
        console.log(
          `🎉 connected to postgres database at ${
            env.DATABASE_URL.length == 0
              ? `${env.DB_HOST}/${env.DB_NAME} as user ${
                  env.DB_USERNAME
                }. Password provided: ${env.DB_PWD ? 'YES' : 'NO'}`
              : env.DATABASE_URL
          }`
        );

        resolve(orm);
      })
      .catch((err) => {
        console.log(
          `😢 unable to connect to database at ${
            env.DATABASE_URL.length == 0
              ? `${env.DB_HOST}/${env.DB_NAME} as user ${
                  env.DB_USERNAME
                }. Password provided: ${env.DB_PWD ? 'YES' : 'NO'}`
              : env.DATABASE_URL
          }. Error: ${err}`
        );

        reject(err);
      });
  });
}
