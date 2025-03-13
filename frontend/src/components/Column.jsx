// import React from "react";
// import { useDroppable } from "@dnd-kit/core";
// import Task from "./Task";

// function Column({ title, tasks }) {
//   const { setNodeRef } = useDroppable({ id: title });

//   return (
//     <div
//       ref={setNodeRef}
//       className="w-1/4 bg-gray-100 p-4 rounded-lg min-h-[300px]"
//     >
//       <h2 className="font-bold text-lg mb-2">{title}</h2>
//       <div className="space-y-2">
//         {tasks.map((task) => (
//           <Task key={task.id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Column;
