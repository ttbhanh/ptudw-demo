// let models = require("./models");
let models = require("./models-auto");
let Op = require("sequelize").Op;
async function test() {
  const keyword = "make";
  const blog = await models.Blog.findOne({
    attributes: ["id", "title", "description", "createdAt"],
    where: { title: { [Op.iLike]: `%${keyword}%` } },
    include: [
      { model: models.Category },
      { model: models.Tag },
      { model: models.User },
      { model: models.Comment },
    ],
  });
  console.log(blog);
}

test();
