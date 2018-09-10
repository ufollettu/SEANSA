require('dotenv').config();//instatiate environment variables

CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'db4free.net';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'superactivator';
CONFIG.db_user = process.env.DB_USER || 'pasquino';
CONFIG.db_password = process.env.DB_PASSWORD || 'radiohead';

CONFIG.secret = process.env.SECRET || 'SuperActivatorSecretKey';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'segretissimo';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '86400000';
