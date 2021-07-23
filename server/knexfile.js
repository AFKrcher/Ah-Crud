// Update with your config settings.
const connectionString = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'pg',
    connection: `postgres://postgres:password@localhost:5432/ahcruddb`
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'ahcruddb',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
