import React, { useContext, useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react"; // Importing an add icon
import Task from "./Task";
import { TaskContext } from "../context/TaskContext";

function Done({ searchQuery }) {
  const { tasks } = useContext(TaskContext);
  const { setNodeRef } = useDroppable({ id: "Done" });

  // Local state to store filtered tasks
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Apply search filter whenever `tasks` or `searchQuery` changes
  useEffect(() => {
    if (!tasks["Done"]) return; // Prevent errors if `tasks["Done"]` is undefined

    const normalizeText = (text) => text?.toLowerCase().replace(/\s+/g, "") || "";
    const normalizedQuery = normalizeText(searchQuery);

    const filtered = tasks["Done"].filter((task) =>
      normalizeText(task.title).includes(normalizedQuery) ||
      normalizeText(task.descrip || task.description || "").includes(normalizedQuery) // Handle different key names
    );

    setFilteredTasks(filtered);
  }, [tasks, searchQuery]); // Re-run when `tasks` or `searchQuery` changes

  const hasTasks = filteredTasks.length > 0;

  return (
    <div
      ref={setNodeRef}
      className="w-full md:w-1/4 bg-[#d1fae5] p-4 rounded-lg min-h-[300px] flex flex-col border-2 border-dashed border-gray-400"
    >
      <h2 className="font-bold text-lg mb-2">Done</h2>

      <div
        className={`w-full h-full flex-grow ${
          hasTasks ? "flex flex-col space-y-2" : "flex items-center justify-center"
        }`}
      >
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

export default Done;
