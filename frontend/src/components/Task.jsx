import React from "react";

const Task = ({ task, onEdit, onDelete }) => {
  // Format the due date to just YYYY-MM-DD
  const formattedDate = new Date(task.due).toISOString().split("T")[0];

  return (
    <div style={styles.card}>
      <div>
        <h3>{task.title}</h3>
        <p style={styles.due}>Due: {formattedDate}</p>
      </div>
      <div>
        <button onClick={() => onEdit(task)} style={styles.button}>
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} style={styles.button}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#f8f9fa",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  due: {
    color: "#6c757d",
    fontSize: "0.9rem",
  },
  button: {
    marginLeft: "8px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Task;
