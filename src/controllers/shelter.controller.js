
const { v4: uuidv4 } = require("uuid");
const Shelter = require("../models/shelter.model");
// CREATE SHELTER
exports.createShelter = async (req, res) => {
  try {
    const shelter = await Shelter.create({
      id: uuidv4(),
      ...req.body,
      created_by: req.user.id,
    });

    res.status(201).json(shelter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL SHELTERS
exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(shelters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET SHELTER BY ID
exports.getShelterById = async (req, res) => {
  try {
    const shelter = await Shelter.findByPk(req.params.id);

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    res.json(shelter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE SHELTER
exports.updateShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByPk(req.params.id);

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    await shelter.update({
      ...req.body,
      updated_by: req.user.id,
    });

    res.json(shelter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE SHELTER (SOFT DELETE)
exports.deleteShelter = async (req, res) => {
  try {
    const shelter = await Shelter.findByPk(req.params.id);

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    await shelter.destroy();

    res.json({ message: "Shelter deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SHELTER PETS
// GET /api/shelters/:id/pets
// Pet.findAll({
//   where: { shelter_id: req.params.id },
// });
// [
//   {
//     id: "uuid",
//     name: "Rocky",
//     breed: "Labrador",
//     status: "AVAILABLE",
//   },
// ];


// Shelter Analytics (Advanced)
exports.getShelterAnalytics = async (req, res) => {
  try {
    console.log("Shelter Analytics API");

    const shelterId = req.params.id;

    const totalPets = await Pet.count({ 
      where: { shelter_id: shelterId },
     });

const approvedPets = await Pet.count({
  where: {
    shelter_id: shelterId,
    approval_status: "APPROVED",
  },
});

const pendingPets = await Pet.count({
  where: {
    shelter_id: shelterId,
    approval_status: "PENDING",
  },
});

const adoptedPets = await Pet.count({
  where: {
    shelter_id: shelterId,
    status: "ADOPTED",
  },
});

const totalViews = await Pet.sum("views_count", {
  where: { shelter_id: shelterId },
});

const totalMeetings = await Meeting.count({
  where: { shelter_id: shelterId },
});

const totalRequests = await Adoption.count({
  where: { shelter_id: shelterId },
});

    const activeFosters = await User.count({ where: { role: "FOSTER" } });
    const totalAdoptions = await Pet.count({ where: { status: "ADOPTED" } });
    

    res.json({
      totalPets,
      approvedPets,
      pendingPets,
      adoptedPets,
      totalViews,
      totalMeetings,
      totalRequests,
      activeFosters,
      totalMeetings,
      totalAdoptions,
    });
  } catch (error) {
    console.error("Analytics Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
