(async function () {
  const models = require("./models");
  const { QueryTypes } = require("sequelize");
  const strSQL = `SELECT * FROM public."Users" Where id=1`;
  try {
    const users = await models.sequelize.query(strSQL, {
      type: QueryTypes.SELECT,
    });
    console.log(users);
  } catch (error) {
    console.error(error);
  }
})();
