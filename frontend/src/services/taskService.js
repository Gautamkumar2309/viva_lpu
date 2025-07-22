import API from "./api";

// ✅ Get all tasks
export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

// ✅ Create new task
export const createTask = async (taskData) => {
  const res = await API.post("/tasks", taskData);
  return res.data;
};

// ✅ Update a task
export const updateTask = async (id, updatedData) => {
  const res = await API.put(`/tasks/${id}`, updatedData);
  return res.data;
};

// ✅ Delete a task
export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};
