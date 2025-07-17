// src/pages/Home.jsx
import { useState } from "react";
import "../styles/app.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleAdd = () => {
    const trimmed = taskInput.trim();
    if (trimmed) {
      const newTask = {
        id: Date.now(),
        text: trimmed,
        due: dueDate,
        completed: false,
      };
      setTasks([newTask, ...tasks]);
      setTaskInput("");
      setDueDate("");
    }
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, currentText) => {
    setEditingTaskId(id);
    setEditInput(currentText);
  };

  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editInput } : task
      )
    );
    setEditingTaskId(null);
    setEditInput("");
  };

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
            <div className={`task ${task.completed ? "completed" : ""}`} key={task.id}>
              <div style={{ flex: 1 }}>
                {editingTaskId === task.id ? (
                  <>
                    <input
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <span onClick={() => handleToggle(task.id)}>{task.text}</span>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      Due: {task.due || "No due date"}
                    </div>
                  </>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
