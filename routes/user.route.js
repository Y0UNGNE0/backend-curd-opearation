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

const router = express.Router();

router.post("/create", createUser);
router.get("/get", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUserId);
router.post("/users/:id/upload-image", uploadUserImage); // Add this line for image upload

module.exports = router;
