import React, { useState } from "react";
import "./WeekView.css";

function WeekView() {
  const today = new Date();

  const getMonday = (date) => {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  };

  const [currentMonday, setCurrentMonday] = useState(getMonday(today));

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

  return (
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

      <div className="week-grid">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`week-day-cell ${d.isToday ? "today" : ""}`}
          >
            <div>
              {d.day}.{d.month}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekView;
