const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const Invite = require("../models/invite.model");
const emailService = require("../services/email.service");
const Pet = require("../models/pet.model");
const Meeting = require("../models/meeting.model");
const stripeService = require("../services/stripe.service");
const generateTokens = require("../utils/generateTokens");
const Adoption = require("../models/adoption.model");

// src/controllers/admin.controller.js
// Approve Adopter ID
exports.approveAdopter = async (req, res) => {
  try {
    console.log("Approve Adopter API");

    const user = await User.findByPk(req.params.id);

    user.is_verified = true;

    await user.save();

    res.json({ message: "Adopter Verified" });
  } catch (error) {
    console.error("Adopter Approval Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// RRAdmin → -----Invite Shelter/Foster/Volunteer , Invite link sent via email
//User registers using invite token and gets assigned role based on token
// and can only register if token is valid and not used before

// Send Invite
exports.sendInvite = async (req, res) => {
  try {
    console.log("Send Invite API");

    const { email, role } = req.body;

    const token = uuidv4();

    await Invite.create({
      email,
      role,
      token,
    });

    await emailService.sendInvite(email, token);

    res.json({ message: "Invite Sent Successfully" });
  } catch (error) {
    console.error("Invite Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Reject Adopter ID with try catch
exports.rejectAdopter = async (req, res) => {
  try {
    console.log("Reject Adopter API");
    const user = await User.findByPk(req.params.id);

    user.is_verified = false;
    await user.save();
    res.json({ message: "Adopter Rejected" });
  } catch (error) {
    console.error("Adopter Rejection Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//  Admin Dashboard Stats & ADMIN ANALYTICS API
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalPets = await Pet.count();
    const totalMeetings = await Meeting.count();
    const pendingApprovals = await Pet.count({
      where: { approval_status: "PENDING" },
    });


    const totalAdoptions = await Adoption.count({
      where: { status: "APPROVED" },
    });

    const adoptedPets = await Pet.count({ where: { status: "ADOPTED" } });

    res.json({
      totalUsers,
      totalPets,
      totalMeetings,

      totalAdoptions,

      pendingApprovals,
      adoptedPets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/admin.controller.js

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};
