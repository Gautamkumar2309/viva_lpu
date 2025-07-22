// src/pages/Home.jsx
import { useState, useEffect } from "react";
import "../styles/app.css";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../services/taskService";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");

  // ✅ Fetch tasks from DB on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err.message);
      }
    };
    fetchTasks();
  }, []);

  // ✅ Add task
  const handleAdd = async () => {
    const trimmed = taskInput.trim();
    if (trimmed) {
      try {
        const newTask = await createTask({
          text: trimmed,
          due: dueDate,
        });
        setTasks([newTask, ...tasks]);
        setTaskInput("");
        setDueDate("");
      } catch (err) {
        console.error("❌ Error adding task:", err.message);
        alert("Failed to add task. Try again.");
      }
    }
  };

  // ✅ Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("❌ Error deleting task:", err.message);
      alert("Failed to delete task.");
    }
  };

  // ✅ Toggle complete (Optional - UI only or can be extended)
  const handleToggle = async (id, currentStatus) => {
  try {
    const updated = await updateTask(id, { completed: !currentStatus });
    setTasks(tasks.map((task) => task._id === id ? updated : task));
  } catch (err) {
    console.error("❌ Failed to toggle task:", err.message);
  }
};


  // ✅ Enable edit mode
  const handleEdit = (id, currentText) => {
    setEditingTaskId(id);
    setEditInput(currentText);
  };

  // ✅ Save edit (updates DB and UI)
  const handleSaveEdit = async (id) => {
    try {
      const updated = await updateTask(id, { text: editInput });
      setTasks(
        tasks.map((task) =>
          task._id === id ? updated : task
        )
      );
      setEditingTaskId(null);
      setEditInput("");
    } catch (err) {
      console.error("❌ Error updating task:", err.message);
      alert("Failed to update task.");
    }
  };

  // ✅ Filter based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h2>✅ Todo Manager</h2>

      {/* Input section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Filter buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => setFilter("all")} style={{ background: filter === "all" ? "#4e9af1" : "#ccc" }}>
          All
        </button>
        <button onClick={() => setFilter("completed")} style={{ background: filter === "completed" ? "#4e9af1" : "#ccc" }}>
          Completed
        </button>
        <button onClick={() => setFilter("pending")} style={{ background: filter === "pending" ? "#4e9af1" : "#ccc" }}>
          Pending
        </button>
      </div>

      {/* Task list */}
      <div style={{ marginTop: "30px" }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
            No tasks to display. Start adding one! 🚀
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div className={`task ${task.completed ? "completed" : ""}`} key={task._id}>
              <div style={{ flex: 1 }}>
                {editingTaskId === task._id ? (
                  <>
                    <input
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(task._id)}>Save</button>
                  </>
                ) : (
                  <>
                    <span onClick={() => handleToggle(task._id, task.completed)}>{task.text}</span>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      Due: {task.due || "No due date"}
                    </div>
                  </>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleEdit(task._id, task.text)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
