var DataTypes = require("sequelize").DataTypes;
var _BlogTag = require("./blogTag");
var _Blog = require("./blog");
var _Category = require("./category");
var _Comment = require("./comment");
var _Tag = require("./tag");
var _User = require("./user");

function initModels(sequelize) {
  var BlogTag = _BlogTag(sequelize, DataTypes);
  var Blog = _Blog(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var Tag = _Tag(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Blog.belongsToMany(Tag, {
    through: BlogTag,
    foreignKey: "blogId",
    otherKey: "tagId",
  });
  Tag.belongsToMany(Blog, {
    through: BlogTag,
    foreignKey: "tagId",
    otherKey: "blogId",
  });
  BlogTag.belongsTo(Blog, { foreignKey: "blogId" });
  Blog.hasMany(BlogTag, { foreignKey: "blogId" });
  Comment.belongsTo(Blog, { foreignKey: "blogId" });
  Blog.hasMany(Comment, { foreignKey: "blogId" });
  Blog.belongsTo(Category, { foreignKey: "categoryId" });
  Category.hasMany(Blog, { foreignKey: "categoryId" });
  BlogTag.belongsTo(Tag, { foreignKey: "tagId" });
  Tag.hasMany(BlogTag, { foreignKey: "tagId" });
  Blog.belongsTo(User, { foreignKey: "authorId" });
  User.hasMany(Blog, { foreignKey: "authorId" });
  Comment.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Comment, { foreignKey: "userId" });

  return {
    BlogTag,
    Blog,
    Category,
    Comment,
    Tag,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
