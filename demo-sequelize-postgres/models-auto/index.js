const { initModels } = require("./init-models");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// import models into sequelize instance

const db = initModels(sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
