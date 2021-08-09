"use strict";
require("dotenv").config();
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/database.json")[env];
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const db = {};

let sequelize;
console.log(`Environment is ${env}`);
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

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].addScopes) {
    db[modelName].addScopes(db);
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].addMethods) {
    db[modelName].addMethods(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;