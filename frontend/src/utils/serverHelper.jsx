const API_URL = "http://localhost:3000/task";

// Function to create a new task
// export const createTask = async (title, descrip, status) => {
//   try {
//     const response = await fetch(`${API_URL}/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, descrip, status }),
//     });

//     if (!response.ok) throw new Error("Failed to create task");

//     return await response.json();
//   } catch (error) {
//     console.error("Error creating task:", error);
//     throw error;
//   }
// };


export const createTask = async (title, description, status) => {  // 🔥 Use "description" instead of "descrip"
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }), // ✅ Correct field name
      });
  
      if (!response.ok) throw new Error("Failed to create task");
  
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };
  


// Function to get tasks based on status
export const getTasks = async (status) => {
  try {
    const response = await fetch(`${API_URL}/get_task/${status}`);
    if (!response.ok) throw new Error("Failed to fetch tasks");

    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Function to update the task status (drag and drop)
export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/update_status/${taskId}`, { // 🔥 Fix the endpoint here
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error("Failed to update task");

    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
