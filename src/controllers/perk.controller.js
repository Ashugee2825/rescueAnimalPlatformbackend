const Perk = require("../models/perk.model");
const PerkAllocation = require("../models/perkAllocation.model");
const { v4: uuidv4 } = require("uuid");

// src/controllers/perk.controller.js    PERK WITH HAPPY HOURS + AUTO TOGGLE
exports.createPerk = async (req, res) => {
  try {
    console.log("Create Perk API");
    const perk = await Perk.create(req.body);

    res.status(201).json({ message: "Perk Created", perk });
  } catch (error) {
    console.error("Create Perk Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.getAllPerks = async (req, res) => {
  try {
    const perks = await Perk.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(perks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPerkById = async (req, res) => {
  try {
    const perk = await Perk.findByPk(req.params.id);

    if (!perk) return res.status(404).json({ message: "Perk not found" });

    res.json(perk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePerk = async (req, res) => {
  try {
    const perk = await Perk.findByPk(req.params.id);

    if (!perk) return res.status(404).json({ message: "Perk not found" });

    await perk.update(req.body);

    res.json(perk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePerk = async (req, res) => {
  try {
    const perk = await Perk.findByPk(req.params.id);

    if (!perk) return res.status(404).json({ message: "Perk not found" });

    await perk.destroy();

    res.json({ message: "Perk deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  PERK REDEMPTION LOGIC
exports.redeemPerk = async (req, res) => {
  try {
    console.log("Redeem Perk API");

    const { allocationId } = req.body;

    const allocation = await PerkAllocation.findByPk(allocationId, {
      include: [Perk],
    });

    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    const now = new Date();
    //const currentTime = now.toTimeString().split(" ")[0];
    const currentTime = now.toISOString().slice(11,19);

    if (
      currentTime < allocation.Perk.start_time ||
      currentTime > allocation.Perk.end_time
    ) {
      return res.status(400).json({ message: "Outside Happy Hours" });
    }

    if (allocation.Perk.offer_type === "ONE_TIME" && allocation.redeemed) {
      return res.status(400).json({ message: "Already redeemed" });
    }

    allocation.redeemed = true;
    allocation.redeemed_at = now;

    await allocation.save();

    console.log("Perk Redeemed Successfully");

    res.json({
      success: true,
      message: "Perk Redeemed",
    });
  } catch (error) {
    console.error("Redeem Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};