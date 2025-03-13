import React, { useContext, useState } from "react";
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { TaskContext } from "../context/TaskContext";
import ToDo from "./Todo";
import InProgress from "./Inprogress";
import Done from "./Done";
import PeerReview from "./PeerReview";
import CreateButton from "../Button/CreateButton";






export default function KanbanBoard() {
  const { handleDragEnd } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-between items-center p-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg" 
          onClick={() => setIsModalOpen(true)}
        >
          + Create Task
        </button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-7 md:space-y-0 p-4 items-start">
          <ToDo searchQuery={searchQuery} />
          <InProgress searchQuery={searchQuery} />
          <PeerReview searchQuery={searchQuery}  />
          <Done  searchQuery={searchQuery}/>
        </div>
      </DndContext>

      <CreateButton isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
