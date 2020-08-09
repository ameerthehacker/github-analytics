import { MikroORM, IDatabaseDriver, Connection } from 'mikro-orm';
import { User } from './entities/user';
import { load } from 'ts-dotenv';

export function connectToDatabase(): Promise<
  MikroORM<IDatabaseDriver<Connection>>
> {
  const env = load({
    DB_HOST: { default: 'localhost', type: String },
    DB_PWD: { default: '', type: String },
    DB_NAME: { default: 'gh-analytics', type: String },
    DB_USERNAME: { default: 'postgres', type: String },
  });

  return new Promise((resolve, reject) => {
    MikroORM.init({
      entities: [User],
      dbName: env.DB_NAME,
      type: 'postgresql',
      clientUrl: env.DB_HOST,
      user: env.DB_USERNAME,
      password: env.DB_PWD,
    })
      .then((orm) => {
        console.log(
          `🎉 connected to postgres database at ${env.DB_HOST}/${
            env.DB_NAME
          } as user ${env.DB_USERNAME}. Password provided: ${
            env.DB_PWD ? 'YES' : 'NO'
          }`
        );

        resolve(orm);
      })
      .catch((err) => {
        console.log(
          `😢 unable to connect to database at ${env.DB_HOST}/${
            env.DB_NAME
          } as user ${env.DB_USERNAME}. Password provided: ${
            env.DB_PWD ? 'YES' : 'NO'
          }. Error: ${err}`
        );

        reject(err);
      });
  });
}
