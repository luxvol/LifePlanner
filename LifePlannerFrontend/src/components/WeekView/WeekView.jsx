import React, { useEffect, useState } from "react";
import "./WeekView.css";

function WeekView() {
  const today = new Date();

  const getMonday = (date) => {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const [currentMonday, setCurrentMonday] = useState(getMonday(today));
  const [tasks, setTasks] = useState([]);
  const [editModal, setEditModal] = useState({ open: false, task: null });
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/getTasks");
      if (!res.ok) {
        throw new Error(`Błąd serwera: ${res.status}`);
      }
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error("❌ Błąd połączenia z backendem: ", err);
      setError("Brak połączenia z serwerem. Spróbuj ponownie później.");
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTasksWrapper = () => fetchTasks();
    window.addEventListener("taskUpdated", fetchTasksWrapper);
    return () => window.removeEventListener("taskUpdated", fetchTasksWrapper);
  }, []);

  const formatLocalDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const nextWeek = () => {
    const next = new Date(currentMonday);
    next.setDate(currentMonday.getDate() + 7);
    setCurrentMonday(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentMonday);
    prev.setDate(currentMonday.getDate() - 7);
    setCurrentMonday(prev);
  };

  const daysOfWeek = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
  const days = daysOfWeek.map((_, i) => {
    const date = new Date(currentMonday);
    date.setDate(currentMonday.getDate() + i);
    return {
      name: daysOfWeek[i],
      iso: formatLocalDate(date), // YYYY-MM-DD
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      isToday: date.toDateString() === today.toDateString(),
    };
  });

  const weekLabel = (() => {
    const start = days[0];
    const end = days[6];
    return `${start.day}.${start.month}.${start.year} – ${end.day}.${end.month}.${end.year}`;
  })();

  // helper: tasks assigned to a given iso date
  const tasksForDate = (isoDate) => {
    return tasks.filter((t) => {
      if (!t.status || !t.date) return false;
      const taskIso = t.date.slice(0, 10); // upewniamy się, że mamy YYYY-MM-DD
      return taskIso === isoDate;
    });
  };

  // edit modal handlers (open with task)
  const openEditModal = (task) => {
    setEditModal({ open: true, task: { ...task } });
  };

  const closeEditModal = () => setEditModal({ open: false, task: null });

  const saveEditedTask = async () => {
    const t = editModal.task;
    const payload = {
      text: t.text,
      date: t.date ? t.date : null,
      status: !!t.date,
    };
    await fetch(`http://localhost:8080/api/editTask/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    closeEditModal();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/api/deleteTask/${id}`, {
      method: "DELETE",
    });
    closeEditModal();
    fetchTasks();
  };

  return (
    <>
      <div className="week-view">
        <div className="week-header-bar">
          <button onClick={prevWeek} className="nav-btn">
            ←
          </button>
          <span>{weekLabel}</span>
          <button onClick={nextWeek} className="nav-btn">
            →
          </button>
        </div>

        <div className="week-days">
          {days.map((d, idx) => (
            <div key={idx} className="week-day-header">
              {d.name}
            </div>
          ))}
        </div>

        {error && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#ffe6e6",
              color: "#cc0000",
              textAlign: "center",
              border: "1px solid #ff9999",
              margin: "10px",
              borderRadius: "6px",
            }}
          >
            {error}
          </div>
        )}
        <div className="week-grid">
          {days.map((d, idx) => (
            <div
              key={idx}
              className={`week-day-cell ${d.isToday ? "today" : ""}`}
            >
              <div style={{ width: "100%" }}>
                <div style={{ fontSize: "0.85rem", marginBottom: "6px" }}>
                  {d.day}.{d.month}
                </div>

                {tasksForDate(d.iso).map((task) => (
                  <div
                    key={task.id}
                    className="task-card"
                    onClick={() => openEditModal(task)}
                    style={{ marginBottom: "6px", cursor: "pointer" }}
                  >
                    {task.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editModal.open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              minWidth: 300,
            }}
          >
            <h3>Edytuj zadanie</h3>
            <input
              type="text"
              value={editModal.task.text}
              onChange={(e) =>
                setEditModal((prev) => ({
                  ...prev,
                  task: { ...prev.task, text: e.target.value },
                }))
              }
              style={{ width: "100%", marginBottom: 8 }}
            />
            <label>
              Data:
              <input
                type="date"
                value={editModal.task.date ? editModal.task.date : ""}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    task: { ...prev.task, date: e.target.value },
                  }))
                }
                style={{ marginLeft: 8 }}
              />
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <div>
                <button onClick={saveEditedTask}>Zapisz</button>
                <button
                  onClick={() => {
                    setEditModal((prev) => ({
                      ...prev,
                      task: { ...prev.task, date: null },
                    }));
                  }}
                  style={{ marginLeft: 8 }}
                >
                  Usuń datę
                </button>
              </div>
              <div>
                <button
                  onClick={() => deleteTask(editModal.task.id)}
                  style={{ marginRight: 8 }}
                >
                  Usuń
                </button>
                <button onClick={closeEditModal}>Zamknij</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeekView;
