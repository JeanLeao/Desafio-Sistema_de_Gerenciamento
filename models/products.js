'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {

    }
  };
  Products.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
    },
    materials_required: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
          const value = this.getDataValue('materials_required');
          return JSON.parse(value);
        },
        set(value) {
          this.setDataValue('materials_required', JSON.stringify(value));
        }
    },
    created_at: {
      type: DataTypes.DATE,
      required: true,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      required: true,
      allowNull: false
    },
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    modelName: 'Products',
  });
  return Products;
};