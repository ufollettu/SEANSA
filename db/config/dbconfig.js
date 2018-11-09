require("dotenv").config(); //instatiate environment variables

CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || "test";
CONFIG.port = process.env.PORT || "3000";

if (CONFIG.app == "dev") {
  CONFIG.db_name = process.env.DB_NAME_DEV || "webgrit_superactivation";
  CONFIG.db_user = process.env.DB_USER_DEV || "pasquale_sup";
  CONFIG.db_password = process.env.DB_PASSWORD_DEV || "radiohead";
  CONFIG.db_dialect = process.env.DB_DIALECT_DEV || "mysql";
  CONFIG.db_host = process.env.DB_HOST_DEV || "localhost";
  CONFIG.db_port = process.env.DB_PORT_DEV || "3306";
} else if (CONFIG.app == "test") {
  CONFIG.db_name = process.env.DB_NAME_TEST || "webgrit_superactivation_test";
  CONFIG.db_user = process.env.DB_USER_TEST || "pasquale_sup";
  CONFIG.db_password = process.env.DB_PASSWORD_TEST || "radiohead";
  CONFIG.db_dialect = process.env.DB_DIALECT_TEST || "mysql";
  CONFIG.db_host = process.env.DB_HOST_TEST || "localhost";
  CONFIG.db_port = process.env.DB_PORT_TEST || "3306";
} else if (CONFIG.app == "prod") {
  CONFIG.db_name = process.env.DB_NAME_PROD;
  CONFIG.db_user = process.env.DB_USER_PROD;
  CONFIG.db_password = process.env.DB_PASSWORD_PROD;
  CONFIG.db_dialect = process.env.DB_DIALECT_PROD;
  CONFIG.db_host = process.env.DB_HOST_PROD;
  CONFIG.db_port = process.env.DB_PORT_PROD;
}

CONFIG.secret = process.env.SECRET || "SuperActivatorSecretKey";

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "segretissimo";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || "86400000";

module.exports = {
  development: {
    username: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect
  },
  test: {
    username: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect
  },
  production: {
    username: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect
  }
};
