const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SupportTicket = sequelize.define(
  "SupportTicket",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_id: DataTypes.UUID,
    category: DataTypes.STRING,
    message: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "OPEN",
    },
    response: DataTypes.TEXT,
  },
  {
    timestamps: true,
  },
);

module.exports = SupportTicket;
