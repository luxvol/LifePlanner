import React, { useEffect, useState } from "react";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/getTasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    fetch("http://localhost:8080/api/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTaskText, status: false }),
    })
      .then(() => {
        setNewTaskText("");
        setIsModalOpen(false);
        return fetch("http://localhost:8080/api/getTasks");
      })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/deleteTask/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        return fetch("http://localhost:8080/api/getTasks");
      })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const saveTaskEdit = (id) => {
    fetch(`http://localhost:8080/api/editTask/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editingTaskText, status: false }),
    })
      .then(() => {
        setEditingTaskId(null);
        return fetch("http://localhost:8080/api/getTasks");
      })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };
  return (
    <div>
      <h2>Lista zadań</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} style={taskItemStyle}>
            {editingTaskId === task.id ? (
              <>
                <input
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                  style={{ flex: 1, marginRight: "10px" }}
                />
                <button
                  onClick={() => saveTaskEdit(task.id)}
                  style={deleteBtnStyle}
                >
                  💾
                </button>
                <button
                  onClick={() => setEditingTaskId(null)}
                  style={deleteBtnStyle}
                >
                  ❌
                </button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditingTaskText(task.text);
                    }}
                    style={deleteBtnStyle}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={deleteBtnStyle}
                  >
                    🗑️
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Brak zadań</p>
      )}

      <button onClick={() => setIsModalOpen(true)} style={addButtonStyle}>
        ➕
      </button>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Dodaj zadanie</h3>
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Wpisz zadanie..."
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={addTask}>Dodaj</button>
              <button onClick={() => setIsModalOpen(false)}> Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "Center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  minWidth: "250px",
};

const addButtonStyle = {
  position: "absolute",
  bottom: "15px",
  right: "15px",
  fontSize: "36px",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const taskItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 8px",
  background: "#ffffff",
  marginBottom: "6px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

const deleteBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  marginLeft: "5px",
};

export default TasksList;
