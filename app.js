const Fastify = require("fastify");
const { IS_DEV_ENV } = require("./config");
const { patchRouting } = require("./routes");
const pino = require('pino');
const pinoMongo = require('pino-mongodb');
const postgresProvider = require('./postgresProvider');

// Підключення до PostgreSQL
const postgresConfig = {
  user: 'node',
  host: 'db',
  database: 'mydb',
  password: 'password',
  port: 5432,
};

const bootstrapFastify = async () => {
  // Ініціалізація PostgreSQL провайдера
  await postgresProvider.init(postgresConfig);

  // Підключення до MongoDB для логування
  const mongoUri = 'mongodb://root:example@mongo:27017/mydb';
  const stream = await pinoMongo({ uri: mongoUri, collection: 'logs' });

  // Створення інстансу Fastify з налаштуваннями
  const fastify = Fastify({
    exposeHeadRoutes: false,
    connectionTimeout: 20000,
    ignoreTrailingSlash: false,
    logger: pino({
      level: 'debug',
      stream,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    }),
    disableRequestLogging: true,
  });

  // Реєстрація плагінів, маршрутів тощо
  patchRouting(fastify);

  if (IS_DEV_ENV) {
    fastify.register(require("@mgcrea/fastify-request-logger"), {});
  }

  return fastify;
};

module.exports = { bootstrapFastify };