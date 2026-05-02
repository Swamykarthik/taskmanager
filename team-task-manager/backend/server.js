const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error:", err));
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
    res.send("Backend running");
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});