import React from "react";
import { useDraggable } from "@dnd-kit/core";

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 rounded-lg shadow-md cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
        touchAction: "none", // Prevents scrolling while dragging
      }}
    >
     <h4 className="font-bold text-gray-700">{task.title}</h4>
     <p className="text-gray-600">{task.description}</p>
    </div>
  );
}

export default Task;
