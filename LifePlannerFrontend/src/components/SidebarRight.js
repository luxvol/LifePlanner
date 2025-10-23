import { useEffect } from "react";
import React, {useState} from "react";

function SidebarRight() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("Ładowanie...");

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
  
  return (
    <aside className="sidebar-right">
      <h2>Tasklista</h2>
      <div>
        {message && <p>{message}</p>}
        {tasks.length > 0 ? (
          tasks.map((task) => {
            <div key={task}>
              {task.text}
            </div>
          })
        ) : (
          <p>Brak zadań</p>
        )
      }
      </div>
    </aside>
  );
}
export default SidebarRight;
