require("dotenv").config(); //instatiate environment variables

CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || "test";
CONFIG.port = process.env.PORT || "3000";

if (CONFIG.app == "dev") {
  CONFIG.db_name = process.env.DB_NAME || "superactivator";
  CONFIG.db_user = process.env.DB_USER || "pasquino";
  CONFIG.db_password = process.env.DB_PASSWORD || "radiohead";
} else if (CONFIG.app == "test") {
  CONFIG.db_name = process.env.DB_NAME || "superactivator_t";
  CONFIG.db_user = process.env.DB_USER || "pasquino_t";
  CONFIG.db_password = process.env.DB_PASSWORD || "radiohead";
}

CONFIG.db_dialect = process.env.DB_DIALECT || "mysql";
CONFIG.db_host = process.env.DB_HOST || "db4free.net";
CONFIG.db_port = process.env.DB_PORT || "3306";

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
