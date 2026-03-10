const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Perk = sequelize.define(
  "Perk",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    venue_id: DataTypes.UUID,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    offer_type: DataTypes.STRING, // ONE_TIME / UNLIMITED
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    expiry_date: DataTypes.DATE,
    toggle_off_date: DataTypes.DATE,
  },
  {
    timestamps: true,
  },
);

module.exports = Perk;
