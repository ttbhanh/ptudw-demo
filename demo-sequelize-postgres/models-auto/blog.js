const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Blog', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagePath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Blogs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Blogs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
