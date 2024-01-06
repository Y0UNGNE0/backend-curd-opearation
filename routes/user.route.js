// routes/userRoutes.js

const express = require("express");
const path = require("path");
const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserId,
  aggregateBySalary,
  aggregateBySameTwo,
  uploadUserImage,
  aggregateByName,
  getUserImage,
  upload, // Add this line for image retrieval
} = require("../controllers/user.controller");
const { Company, companyUser } = require("../controllers/company.controller");

const router = express.Router();
const app = express(); // Add this line to create the app object

router.post("/users/create", createUser);
router.get("/users/get", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUserId);
router.post("/users/:id/upload-image", uploadUserImage);
router.get("/api/v1/users/:id/image", getUserImage);

router.post("/companies/create", Company);
router.get("/companies/get", companyUser);

router.post("/image", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.json({ msgs: err.message });
    }

    res.json({
      file: `http://localhost:3000/${req.file.path}`,
    });
  });
});
router.get("/aggregate-by-name/:name", aggregateByName);
router.get("/aggregate-by-name/", aggregateBySameTwo);
router.get("/aggregate-by-salary/:salary", aggregateBySalary);

// router.get("/aggregate-by-name/:name", aggregateByName);

module.exports = router;
