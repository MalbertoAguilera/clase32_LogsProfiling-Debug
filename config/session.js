const MongoStore = require('connect-mongo');
const dotenv = require("dotenv").config();

module.exports = {
  // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL}),
  secret: process.env.MONGO_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000,
  },
};
