import React from "react";
import WeekDay from "./WeekDay";

function WeekView() {
  const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

  return (
    <main className="main">
      <div className="week-header">
        {days.map((day) => (
          <div key={day} className="week-header-day">
            {day}
          </div>
        ))}
      </div>
      <div className="week-grid">
        {days.map((day) => (
          <WeekDay key={day} name={day} />
        ))}
      </div>
    </main>
  );
}

export default WeekView;
