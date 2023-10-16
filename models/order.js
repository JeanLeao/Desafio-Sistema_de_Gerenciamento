'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {

      this.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'Products',
      });


    }
  };
  Orders.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    amount_required: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    flag_finished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    modelName: 'Orders',
  });
  return Orders;
};