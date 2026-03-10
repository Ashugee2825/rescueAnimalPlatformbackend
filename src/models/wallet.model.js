const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// src/models/wallet.model.js
const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Sequelize auto generates UUID
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Wallet;