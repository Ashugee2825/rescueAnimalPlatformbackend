const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PerkAllocation = sequelize.define(
  "PerkAllocation",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    perk_id: DataTypes.UUID,
    assigned_by: DataTypes.UUID,
    assigned_to: DataTypes.UUID,
    allocation_type: DataTypes.STRING, // AUTO / MANUAL
    redeemed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    redeemed_at: DataTypes.DATE,
  },
  {
    timestamps: true,
  },
);

module.exports = PerkAllocation;
