// routes/userRoutes.js

const express = require("express");
const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserId,
  uploadUserImage,
} = require("../controllers/user.controller");
const { Company, companyUser } = require("../controllers/company.controller");

const router = express.Router();

router.post("/create", createUser);
router.get("/get", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUserId);
router.post("/users/:id/upload-image", uploadUserImage); // Add this line for image upload

router.post("/com/create", Company);
router.get("/com/get", companyUser);

module.exports = router;
