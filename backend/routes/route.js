// create.js
const express = require('express');
const bodyParser = require('body-parser');
const Task = require('../models/Task');
const router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json())


// router.post("/create", async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         const newTask = new Task({ title, description, status: "To Do" });
//         await newTask.save();

//         return res.status(201).json(newTask);  // 🔥 Ensure full task is returned
//     } catch (error) {
//         return res.status(500).json({ error: "Failed to create task" });
//     }
// });


// router.post("/create", async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         const newTask = new Task({ title, description, status: "To Do" });
//         await newTask.save();

//         return res.status(201).json(newTask);  // ✅ Ensure full task is returned
//     } catch (error) {
//         return res.status(500).json({ error: "Failed to create task" });
//     }
// });


// const { toast } = require("react-toastify"); // Import if using in backend (optional)

router.post("/create", async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if a task with the same title already exists
        const existingTask = await Task.findOne({ title });
        if (existingTask) {
            return res.status(400).json({ error: "Task with this title already exists" });
        }

        const newTask = new Task({ title, description, status: "To Do" });
        await newTask.save();

        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create task" });
    }
});






// get_task
router.get("/get_task/:status", async (req, res) => {
    try {
        const { status } = req.params; // Correct destructuring

        const tasks = await Task.find({ status }); // Directly filter with status

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// update_task
// Update task status

router.put("/update_status/:id", async (req, res) => {
    try {
        const { id } = req.params; // This is the MongoDB _id
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "New status is required" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id, // Use MongoDB _id
            { status },
            { new: true } // Return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Server error" });
    }
});




module.exports = router;