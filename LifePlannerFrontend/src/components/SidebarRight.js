import React from "react";
import TasksList from "./TasksList";

function SidebarRight() {
  return (
    <aside className="sidebar-right">
      <TasksList />
    </aside>
  );
}

export default SidebarRight;

/*import { useEffect } from "react";
import React, { useState } from "react";

function SidebarRight() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("Ładowanie...");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/getTasks")
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setMessage("");
      })
      .catch((err) => setMessage("Błąd: " + err.message));
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;

    fetch("http://localhost:8080/api/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newTask,
        status: false,
      }),
    })
      .then((res) => res.json())
      .then((addedTask) => {
        setTasks([...tasks, addedTask]);
        setNewTask("");
      });
  };

  return (
    <aside className="sidebar-right">
      <h2>Tasklista</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Nowe zadanie..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ width: "80%" }}
        />
        <button onClick={addTask}>Dodaj</button>
      </div>

      <div>
        {message && <p>{message}</p>}
        {tasks.length > 0 ? (
          tasks.map((task) => <div key={task}>{task.text}</div>)
        ) : (
          <p>Brak zadań</p>
        )}
      </div>
    </aside>
  );
}
export default SidebarRight;*/
