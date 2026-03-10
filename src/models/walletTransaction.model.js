const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// src/models/walletTransaction.model.js
const WalletTransaction = sequelize.define(
  "WalletTransaction",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    wallet_id: DataTypes.UUID,
    amount: DataTypes.FLOAT,
    type: DataTypes.STRING, // CREDIT / DEBIT
    description: DataTypes.STRING,
  },
  {
    timestamps: true,
  },
);

module.exports = WalletTransaction;
