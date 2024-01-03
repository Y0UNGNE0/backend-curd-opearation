const Company = require("../models/Company");

exports.Company = async (req, res) => {
  try {
    const { name, salary, type } = req.body;
    const response = await Company.create({
      name,
      salary,
      type,
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

exports.companyUser = async (req, res) => {
  try {
    const users = await Company.find();

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
