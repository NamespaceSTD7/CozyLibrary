require('dotenv').config();

const config = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
};

module.exports = config;