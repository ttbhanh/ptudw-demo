const config = require("./sequelize-auto-config.json");

const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    directory: config.directory, // where to write files
    port: config.port,
    caseModel: config.caseModel, // Set case of model names: c|l|o|p|u; c = camelCase, l = lower_case, o = original (default), p = PascalCase, u = UPPER_CASE
    caseProp: config.caseProp, // Set case of property names
    caseFile: config.caseFile, // Set case of file names
    singularize: config.singularize, // convert plural table names to singular model names
    additional: config.additional,
  }
);

auto.run().then((data) => {
  console.log(data.tables); // table and field list
  console.log(data.foreignKeys); // table foreign key list
  console.log(data.indexes); // table indexes
  console.log(data.hasTriggerTables); // tables that have triggers
  console.log(data.relations); // relationships between models
  console.log(data.text); // text of generated models
});
