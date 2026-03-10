const { v4: uuidv4 } = require("uuid");
const Adoption = require("../models/adoption.model");
const Pet = require("../models/pet.model");
const stripeService = require("../services/stripe.service");


// Create Request Adopter -- Request Adoption
exports.requestAdoption = async (req, res) => {
  try {
    console.log("Adoption Request");
    const { pet_id, meeting_date } = req.body;

    const adoption = await Adoption.create({
      id: uuidv4(),
      user_id: req.user.id,
      pet_id: req.body.pet_id,
      adopter_id: req.user.id,
      shelter_id: req.user.shelter_id,
      meeting_date: req.body.meeting_date,
    });

    res.status(201).json(adoption);
  } catch (error) {
    console.error("Adoption Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.approveAdoption = async (req, res) => {
  try {
    console.log("Approve Adoption");

    const adoption = await Adoption.findByPk(req.params.id);

    adoption.status = "APPROVED";
    await adoption.save();

    await Pet.update({ status: "ADOPTED" }, { where: { id: adoption.pet_id } });
    await smsService.sendSMS(user.phone, "Your adoption approved");

    res.json({ message: "Adoption Approved" });
  } catch (error) {
    console.error("Adoption Approval Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.rejectAdoption = async (req, res) => {
  try {
    console.log("Reject Adoption");
    const adoption = await Adoption.findByPk(req.params.id);

    adoption.status = "REJECTED";
    await adoption.save();

    res.json({ message: "Adoption Rejected" });
  } catch (error) {
    console.error("Adoption Rejection Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
