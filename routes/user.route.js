// routes/userRoutes.js

const express = require("express");
const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserId,
  uploadUserImage,
  getUserImage, // Add this line for image retrieval
} = require("../controllers/user.controller");
const { Company, companyUser } = require("../controllers/company.controller");

const router = express.Router();

router.post("/users/create", createUser);
router.get("/users/get", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUserId);
router.post("/users/:id/upload-image", uploadUserImage);
// router.get("/users/:id/image", getUserImage);
router.get("/api/v1/users/:id/image", getUserImage);

// router.get("/users/:id/image", getUserImage); // Add this line for image retrieval

router.post("/companies/create", Company);
router.get("/companies/get", companyUser);

module.exports = router;
