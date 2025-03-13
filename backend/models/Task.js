const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  // status can be "To Do", "In Progress", "Peer Review", "Done"
  // At first when the task is created, the status will be "To Do"
  
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Peer Review", "Done"], // Kanban sections
    default: "To Do",
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
