const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
router.post("/",async(req,res)=>{
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/",async(req,res)=>{
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put("/:id",async(req,res)=>{
    try {
        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json("Task deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;