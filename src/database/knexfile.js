module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'knex_migrations',
    },
  },

  test: {
    client: 'postgresql',
    connection: process.env.TEST_DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/tallerify_test',
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'knex_migrations',
    },
  },

};
