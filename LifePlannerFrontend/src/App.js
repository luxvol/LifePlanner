import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Ładowanie...");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Błąd: " + err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>LifePlanner - frontend</h1>
      <p>
        Odpowiedź z backendu: <strong>{message}</strong>
      </p>
    </div>
  );
}

export default App;
