const express = require("express");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("userImage");

exports.createUser = async (req, res) => {
  try {
    const { name, email, profileImage, company } = req.body;
    const response = await User.create({
      name,
      email,
      company,
      profileImage,
    });

    return res.status(201).json({
      success: true,
      data: response,
      message: "Data saved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      data: users,
      message: "Data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.getUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const cleanedUserId = userId.replace(/^:/, "");

    const user = await User.findById(cleanedUserId).populate("company");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const cleanedUserId = userId.replace(/^:/, "");

    const user = await User.findById(cleanedUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(cleanedUserId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;
    user.email = email;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.uploadUserImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const cleanedUserId = userId.replace(/^:/, "");

    const user = await User.findById(cleanedUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "File upload error",
          error: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      user.profileImage = req.file.path;

      const baseUrl = "http://localhost:3000/api/v1/users";

      user.profileImageUrl = `${baseUrl}/uploads/${req.file.filename}`;

      user.save();

      return res.status(200).json({
        success: true,
        message: "User image uploaded successfully",
        data: user,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.getUserImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const cleanedUserId = userId.replace(/^:/, "");

    const user = await User.findById(cleanedUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user has a profile image
    if (!user.profileImage) {
      return res.status(404).json({
        success: false,
        message: "User has no profile image",
      });
    }

    const filePath = path.join(__dirname, "..", "public", user.profileImage);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Profile image not found",
      });
    }

    // Send the image file in the response
    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.aggregateByName = async (req, res) => {
  try {
    const { name } = req.params;

    const aggregatedData = await User.aggregate([
      {
        $match: {
          name: { $regex: new RegExp(name, "i") },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: aggregatedData,
      message: "Data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.aggregateBySameTwo = async (req, res) => {
  try {
    const { name } = req.params;

    const aggregatedData = await User.aggregate([
      {
        $match: {
          type: "frontend",
        },
      },
      {
        $match: {
          name: { $regex: new RegExp(name, "i") },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: aggregatedData,
      message: "Data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.aggregateBySalary = async (req, res) => {
  try {
    const { salary } = req.params;

    const aggregatedData = await User.aggregate([
      {
        $match: {
          salary: parseInt(salary), // Assuming salary is stored as a number
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: aggregatedData,
      message: "Data retrieved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// here we also write logic and opration here dont define routes
