const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Company", CompanySchema);

// here is modal which schema of chaap which how data will store
