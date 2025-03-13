

import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { createTask } from "../utils/serverHelper";




import { toast } from "react-toastify";



function CreateButton({ isOpen, onClose }) {
  const { setTasks, setRefreshKey } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;


  // const handleSubmit = async () => {
  //   if (!title.trim()) return;

  //   const newTask = await createTask(title, description, "To Do")

  //   setTasks((prevTasks) => ({
  //     ...prevTasks,
  //     "To Do": [
  //       ...prevTasks["To Do"],
  //       { title, description: description },
  //     ],
  //   }));

  //   setTitle("");
  //   setDescription("");
  //   onClose();
  // };

  // const handleSubmit = async () => {
  //   if (!title.trim()) return;
  
  //   try {
  //     const newTask = await createTask(title, description, "To Do");
  
  //     const taskWithId = { ...newTask, id: newTask._id.toString() }; // 🔥 Ensure task has an id
  
  //     setTasks((prevTasks) => ({
  //       ...prevTasks,
  //       "To Do": [...prevTasks["To Do"], taskWithId], // 🔥 Use the new task object
  //     }));
  
  //     setTitle("");
  //     setDescription("");
  //     onClose();
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //   }
  // };
  // const handleSubmit = async () => {
  //   if (!title.trim()) return;
  
  //   try {
  //     const newTask = await createTask(title, description, "To Do");
  
  //     const taskWithId = { 
  //       ...newTask, 
  //       id: newTask._id.toString(), 
  //       description: newTask.description  // 🔥 Ensure description is set
  //     };
  
  //     setTasks((prevTasks) => ({
  //       ...prevTasks,
  //       "To Do": [...prevTasks["To Do"], taskWithId], 
  //     }));
  
  //     setTitle("");
  //     setDescription("");
  //     onClose();
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //   }
  // };
  
  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty!"); // 🔥 Prevent empty tasks
      return;
    }
  
    try {
      const newTask = await createTask(title, description, "To Do");
  
      const taskWithId = { 
        ...newTask, 
        id: newTask._id.toString(), 
        description: newTask.description 
      };
  
      setTasks((prevTasks) => ({
        ...prevTasks,
        "To Do": [...prevTasks["To Do"], taskWithId], 
      }));
  
      toast.success("Task created successfully!"); // ✅ Success message
  
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      if (error.message.includes("Task with this title already exists")) {
        toast.error("A task with this title already exists!"); // 🔥 Show toast if task exists
      } else {
        toast.error("Failed to create task!"); // 🚨 General error message
      }
    }
  };



  // const handleSubmit = async () => {
  //   if (!title.trim()) return;
  
  //   try {
  //     const newTask = await createTask({ title, description, status: "To Do" });
  
  //     console.log("New Task Response:", newTask); // Debugging output
  
  //     if (!newTask || !newTask._id) {
  //       throw new Error("Invalid task object received.");
  //     }
  
  //     const taskWithId = { 
  //       id: newTask._id.toString(), 
  //       title, 
  //       description 
  //     };
  
  //     setTasks((prevTasks) => ({
  //       ...prevTasks,
  //       "To Do": [...prevTasks["To Do"], taskWithId],
  //     }));
  
  //     setRefreshKey((prev) => prev + 1);
  //     setTitle("");
  //     setDescription("");
  //     onClose();
  //   } catch (error) {
  //     console.error("Error in handleSubmit:", error);
  //   }
  // };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateButton;

