const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://admin:admin123@cluster0.xls9kfc.mongodb.net/taskmanager?retryWrites=true&w=majority")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
    res.send("Backend running");
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});