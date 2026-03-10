const { v4: uuidv4 } = require("uuid");
const Pet = require("../models/pet.model");
const stripeService = require("../services/stripe.service");

// Add Pet (Foster + Shelter)
exports.addPet = async (req, res) => {
  try {
    console.log("Add Pet API Hit");

    // Beginner safety check
    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing",
      });
    }

    const {
      name,
      type,
      breed,
      age,
      gender,
      color,
      weight,
      is_trained,
      temperament,
      shelter_id,
    } = req.body;

    // Validation
    if (!name || !type || !breed || !age) {
      return res.status(400).json({
        message: "name, type, breed, age are required",
      });
    }

    const pet = await Pet.create({
      id: uuidv4(), //  Only primary key generated
      pet_unique_id: "PET-" + Date.now(), // Unique pet ID for public use

      name,
      type,
      breed,
      age,
      gender,
      color,
      weight,
      is_trained,
      temperament,
      description: req.body.description || "",
      status: "AVAILABLE",
      shelter_id,
      foster_id: req.body.foster_id || null,

      verification_document: req.file?.location,
      approval_status: "PENDING",
      created_by: req.user.id, //  Logged-in user
    });

    res.status(201).json({
      message: "Pet Submitted for Approval",
      pet,
    });
  } catch (error) {
    console.error("Add Pet Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// RRAdmin Approve Pet
exports.approvePet = async (req, res) => {
  try {
    console.log("Approve Pet API Hit");

    // Beginner safety check
    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing",
      });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Pet ID required",
      });
    }

    const pet = await Pet.findByPk(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    //     if (pet.approval_status === "ON_HOLD") {
    //   return res.status(400).json({ message: "Pet is on hold, cannot reject" });
    // }

    // const VALID_STATUS = ["APPROVED", "REJECTED", "ON_HOLD"];

    // if (!VALID_STATUS.includes(req.body.status)) {
    //    return res.status(400).json({ message: "Invalid status" });
    // }

    // pet.approval_status = req.body.status;

    if (pet.approval_status === "APPROVED") {
      return res.status(400).json({
        message: "Pet already approved",
      });
    }

    pet.approval_status = "APPROVED";

    pet.approved_by = req.user.id;
    pet.approved_at = new Date();
    {
      pet.pet_unique_id = "PET-" + Date.now();
    }

    await pet.save();

    console.log("Pet Approved");

    res.json({
      success: true,
      message: "Pet Approved Successfully",
      data: pet,
    });
  } catch (error) {
    console.error("Approve Pet Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// // RRAdmin Reject Pet
// exports.rejectPet = async (req, res) => {
//   try {
//     console.log("Reject Pet API Hit");

// // RRAdmin pet on hold status check before rejecting
//     const pet = await Pet.findByPk(req.params.id);
//     if (!pet) {

//         // Check if pet is already on hold
//         if (pet.approval_status === "ON_HOLD") {
//           return res.status(400).json({ message: "Pet is on hold, cannot reject" });
        
        
//         // If not on hold, proceed with rejection}




// GET ALL PETS (Pagination + Filter)
exports.getAllPets = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, city } = req.query;



    const pets = await Pet.findAndCountAll({
      where: {
        approval_status: "APPROVED",
        ...(type && { type }),
        ...(city && { city }),
      },
      limit: +limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
    });

    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PET
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    pet.views_count += 1;
    await pet.save();

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE PET
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    await pet.update({
      ...req.body,
      updated_by: req.user.id,
    });

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PET (Soft Delete)
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    await pet.destroy(); // soft delete because paranoid true

    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Geo-location SearchGET NEARBY PETS Uses Haversine formula.
exports.getNearbyPets = async (req, res) => {
  const { lat, lng, radius } = req.query;

  const pets = await sequelize.query(
    `
    SELECT *,
    ( 6371 * acos(
      cos(radians(:lat)) *
      cos(radians(latitude)) *
      cos(radians(longitude) - radians(:lng)) +
      sin(radians(:lat)) *
      sin(radians(latitude))
    )) AS distance
    FROM "Pets"
    HAVING distance < :radius
    ORDER BY distance;
    `,
    {
      replacements: { lat, lng, radius },
      type: sequelize.QueryTypes.SELECT,
    },
  );

  res.json(pets);
};
