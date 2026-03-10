const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pet = sequelize.define(
  "Pet",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    pet_unique_id: {
      type: DataTypes.STRING,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM("MALE", "FEMALE"),

    description: DataTypes.TEXT,

    status: {
      type: DataTypes.ENUM("AVAILABLE", "ADOPTED", "ON_HOLD"),
      defaultValue: "AVAILABLE",
    },

    adoption_fee: DataTypes.FLOAT,

    vaccinated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    sterilized: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    medical_history: DataTypes.TEXT,
    microchip_id: DataTypes.STRING,

    city: DataTypes.STRING,
    state: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

    images: DataTypes.JSON, // store array of image URLs

    views_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    shelter_id: DataTypes.UUID,
    foster_id: DataTypes.UUID,

    color: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    is_trained: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    temperament: DataTypes.STRING,

    verification_document: DataTypes.STRING,

    approval_status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED", "ON_HOLD"),
      defaultValue: "PENDING",
    },

    rejection_reason: DataTypes.TEXT,
    approved_by: DataTypes.UUID,
    approved_at: DataTypes.DATE,

    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  },
  {
    timestamps: true,
    paranoid: true, // Soft delete
  },
);

module.exports = Pet;
