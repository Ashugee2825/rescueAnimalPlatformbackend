const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Chat = sequelize.define(
  "Chat",
  {
    sender_id: DataTypes.UUID,
    receiver_id: DataTypes.UUID,
    message: DataTypes.TEXT,
  },
  { timestamps: true },
);

module.exports = Chat;


