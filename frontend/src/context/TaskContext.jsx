import React, { createContext, useState, useEffect } from "react";
import { getTasks, createTask,updateTaskStatus } from "../utils/serverHelper";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    "Peer Review": [],
    "Done": [],
  });

  const [refreshKey, setRefreshKey] = useState(0);




  // 🔥 Fetch tasks from MongoDB when the app starts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const toDoTasks = await getTasks("To Do");
        const inProgressTasks = await getTasks("In Progress");
        const peerReviewTasks = await getTasks("Peer Review");
        const doneTasks = await getTasks("Done");

        setTasks({
          "To Do": toDoTasks.map((task) => ({ ...task, id: task._id.toString() })),
          "In Progress": inProgressTasks.map((task) => ({ ...task, id: task._id.toString() })),
          "Peer Review": peerReviewTasks.map((task) => ({ ...task, id: task._id.toString() })),
          "Done": doneTasks.map((task) => ({ ...task, id: task._id.toString() })),
        });
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Add new task and save to MongoDB
  const addTask = async (newTask) => {
    try {
      const savedTask = await createTask(newTask);
      const taskWithId = { ...savedTask, id: savedTask._id.toString() };
  
      setTasks((prev) => ({
        ...prev,
        "To Do": [...prev["To Do"], taskWithId],
      }));
  
      setRefreshKey((prev) => prev + 1); // 🔥 Force re-render
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  

  // ✅ Handle Drag and Drop and sync with MongoDB
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === active.id)
    );
    const targetColumn = over.id;

    if (sourceColumn && targetColumn && sourceColumn !== targetColumn) {
      setTasks((prev) => {
        const updatedTasks = { ...prev };
        const taskToMove = updatedTasks[sourceColumn].find((task) => task.id === active.id);

        updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter((task) => task.id !== active.id);
        updatedTasks[targetColumn] = [...updatedTasks[targetColumn], { ...taskToMove, status: targetColumn }];

        return updatedTasks;
      });

      try {
        await updateTaskStatus(active.id, targetColumn); // 🔥 Update status in MongoDB
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    }
  };


  







  return (
    <TaskContext.Provider value={{ tasks, handleDragEnd, setTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
