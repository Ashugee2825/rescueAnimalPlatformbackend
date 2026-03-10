const User = require("./user.model");
const Pet = require("./pet.model");
const Shelter = require("./shelter.model");
const Adoption = require("./adoption.model");
const Meeting = require("./meeting.model");
const Chat = require("./chat.model");
const Review = require("./review.model");
const Perk = require("./perk.model");
const PerkAllocation = require("./perkAllocation.model");
const Wallet = require("./wallet.model");
const WalletTransaction = require("./walletTransaction.model");
const SupportTicket = require("./supportTicket.model");

/*
Important: Sequelize associations define
table relationships (foreign keys)
*/

// ---------------- USER RELATIONS ----------------

User.hasOne(Wallet, { foreignKey: "user_id" });
Wallet.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Chat, { foreignKey: "sender_id" });
User.hasMany(Chat, { foreignKey: "receiver_id" });

User.hasMany(Adoption, { foreignKey: "adopter_id" });
Adoption.belongsTo(User, { foreignKey: "adopter_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });


// ---------------- SHELTER RELATIONS ----------------

Shelter.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Shelter, { foreignKey: "user_id" });

Shelter.hasMany(Pet, { foreignKey: "shelter_id" });
Pet.belongsTo(Shelter, { foreignKey: "shelter_id" });

Shelter.hasMany(Review, { foreignKey: "shelter_id" });
Review.belongsTo(Shelter, { foreignKey: "shelter_id" });

// ---------------- PET RELATIONS ----------------
Pet.belongsTo(Shelter, { foreignKey: "shelter_id" });

Pet.hasMany(Meeting, { foreignKey: "pet_id" });
Meeting.belongsTo(Pet, { foreignKey: "pet_id" });

Pet.hasMany(Adoption, { foreignKey: "pet_id" });
Adoption.belongsTo(Pet, { foreignKey: "pet_id" });


// Foster relation
User.hasMany(Pet, { foreignKey: "foster_id" });
Pet.belongsTo(User, { foreignKey: "foster_id" });

// Adoption
Adoption.belongsTo(User, { foreignKey: "adopter_id" });
Adoption.belongsTo(Pet, { foreignKey: "pet_id" });

// Meeting
Meeting.belongsTo(Pet, { foreignKey: "pet_id" });
Meeting.belongsTo(User, { foreignKey: "adopter_id" });

// Chat
Chat.belongsTo(User, { foreignKey: "sender_id" });
Chat.belongsTo(User, { foreignKey: "receiver_id" });

// Review
Review.belongsTo(User, { foreignKey: "user_id" });
Review.belongsTo(Shelter, { foreignKey: "shelter_id" });

// ---------------- PERK RELATIONS ----------------

Perk.hasMany(PerkAllocation, { foreignKey: "perk_id" });
PerkAllocation.belongsTo(Perk, { foreignKey: "perk_id" });

User.hasMany(PerkAllocation, { foreignKey: "user_id" });
PerkAllocation.belongsTo(User, { foreignKey: "user_id" });

// ---------------- WALLET ----------------

Wallet.hasMany(WalletTransaction, { foreignKey: "wallet_id" });
WalletTransaction.belongsTo(Wallet, { foreignKey: "wallet_id" });

// ---------------- CHAT ----------------

Chat.belongsTo(User, { foreignKey: "sender_id" });
Chat.belongsTo(User, { foreignKey: "receiver_id" });



module.exports = {
  User,
  Pet,
  Shelter,
  Adoption,
  Meeting,
  Chat,
  Review,
  Perk,
  PerkAllocation,
  Wallet,
  WalletTransaction,
  Meeting,
  SupportTicket,
};
