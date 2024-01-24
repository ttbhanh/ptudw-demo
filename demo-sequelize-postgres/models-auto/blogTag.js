const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BlogTag', {
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Blogs',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'BlogTag',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "BlogTag_pkey",
        unique: true,
        fields: [
          { name: "blogId" },
          { name: "tagId" },
        ]
      },
    ]
  });
};
