// require the express
const express = require("express");
// server created
const app = express();
const path = require("path");

require("dotenv").config();
const mongodb = require("./config/database");
mongodb();

const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.use("/api/v1", require("./routes/user.route"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
  res.json({
    success: true,
    message: "Data get successfully",
  });
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is listen at ${PORT}`);
});
