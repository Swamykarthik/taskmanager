const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin123@cluster0.xls9kfc.mongodb.net/taskmanager?retryWrites=true&w=majority")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));
// Routes import
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend running");
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});