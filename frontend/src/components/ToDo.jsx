import React, { useContext, useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import Task from "./Task";
import { Plus } from "lucide-react";
import { TaskContext } from "../context/TaskContext";
import { getTasks } from "../utils/serverHelper";

function ToDo({ searchQuery }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const { setNodeRef } = useDroppable({ id: "To Do" });

  // Local state to store filtered tasks
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks("To Do");

        const updatedTasks = fetchedTasks.map(task => ({
          ...task,
          id: task._id.toString(), // Convert MongoDB `_id` to string
        }));

        setTasks(prev => ({ ...prev, "To Do": updatedTasks }));
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    fetchTasks();
  }, [setTasks]);

  // Apply search filter whenever `tasks` or `searchQuery` changes
  useEffect(() => {
    if (!tasks["To Do"]) return; // Prevent errors if tasks["To Do"] is undefined

    const normalizeText = (text) => text?.toLowerCase().replace(/\s+/g, "") || "";
    const normalizedQuery = normalizeText(searchQuery);

    const filtered = tasks["To Do"].filter((task) =>
      normalizeText(task.title).includes(normalizedQuery) ||
      normalizeText(task.descrip || task.description || "").includes(normalizedQuery) // Handle different key names
    );

    setFilteredTasks(filtered);
  }, [tasks, searchQuery]); // Re-run when tasks or searchQuery changes

  const hasTasks = filteredTasks.length > 0;

  return (
    <div
      ref={setNodeRef}
      className="w-full md:w-1/4 bg-blue-100 p-4 rounded-lg min-h-[300px] flex flex-col border-2 border-dashed border-gray-400"
    >
      <h2 className="font-bold text-lg mb-2">To Do</h2>

      <div className={`w-full h-full flex-grow ${hasTasks ? "flex flex-col space-y-2" : "flex items-center justify-center"}`}>
        {hasTasks ? (
          filteredTasks.map((task) => <Task key={task.id} task={task} />)
        ) : (
          <p className="text-gray-500 italic flex items-center justify-center h-full">
            {searchQuery ? "No matching tasks" : "Drag task to add"}
          </p>
        )}
      </div>

      {hasTasks && (
        <div className="mt-2 flex justify-center items-center text-gray-400 font-medium">
          <p className="mr-1">Drop new task</p>
          <Plus size={20} />
        </div>
      )}
    </div>
  );
}

export default ToDo;
