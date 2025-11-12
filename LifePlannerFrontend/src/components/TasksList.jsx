import React, { useEffect, useState } from "react";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [editingTaskDate, setEditingTaskDate] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/getTasks");
      const data = await res.json();
      setTasks(data.filter((t) => !t.status));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTaskText.trim()) return;
    const payload = {
      text: newTaskText,
      date: newTaskDate ? newTaskDate : null,
      status: !!newTaskDate,
    };
    await fetch("http://localhost:8080/api/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setNewTaskText("");
    setNewTaskDate("");
    setIsModalOpen(false);
    fetchTasks();

    window.dispatchEvent(new Event("taskUpdated"));
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/api/deleteTask/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
    setEditingTaskDate(task.date ? task.date : "");
  };

  const saveTaskEdit = async (id) => {
    const payload = {
      text: editingTaskText,
      date: editingTaskDate ? editingTaskDate : null,
      status: !!editingTaskDate,
    };
    await fetch(`http://localhost:8080/api/editTask/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setEditingTaskId(null);
    setEditingTaskText("");
    setEditingTaskDate("");
    fetchTasks();

    window.dispatchEvent(new Event("taskUpdated"));
  };
  return (
    <div style={{ position: "relative", minHeight: "300px" }}>
      <h2>Lista zadań</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} style={taskItemStyle}>
            {editingTaskId === task.id ? (
              <>
                <input
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)}
                  style={{ flex: 1, marginRight: "8px" }}
                />
                <input
                  type="date"
                  value={editingTaskDate}
                  onChange={(e) => setEditingTaskDate(e.target.value)}
                  style={{ marginRight: "8px" }}
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
                <span style={{ flex: 1 }}>{task.text}</span>
                <div>
                  <button
                    onClick={() => startEdit(task)}
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
            <label style={{ marginTop: "8px" }}>
              Data (opcjonalnie):
              <input
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </label>
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
  position: "fixed", // <- kluczowa zmiana — przykleja do ekranu, nie do kontenera
  bottom: "15px",
  right: "15px",
  fontSize: "36px",
  color: "#0078d7",
  background: "none", // upewniamy się, że nie ma tła
  border: "none",
  width: "48px",
  height: "48px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000, // na wierzchu
  transition: "transform 0.2s, color 0.2s",
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
