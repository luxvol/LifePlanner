import React, { useState } from "react";
import "./MonthlyCalendar.css";

function MonthlyCalendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const { year, month } = currentDate;

  const monthName = new Date(year, month).toLocaleString("pl-PL", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  let startDay = firstDay.getDay();
  if (startDay === 0) startDay = 6;
  else startDay -= 1;

  const days = [];

  const prevLastDay = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: prevLastDay - i,
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  const totalCells = 42;
  let nextMonthDays = 1;
  while (days.length < totalCells) {
    days.push({
      day: nextMonthDays++,
      isCurrentMonth: false,
    });
  }

  const prevMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };
  return (
    <div className="monthly-calendar">
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-btn">
          ←
        </button>
        {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}
        <button onClick={nextMonth} className="nav-btn">
          →
        </button>
      </div>
      <div className="calendar-grid">
        {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map((d) => (
          <div key={d} className="day-name">
            {d}
          </div>
        ))}

        {days.map((d, idx) => {
          const isToday =
            d.isCurrentMonth &&
            d.day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const cellClass = `
          day-cell 
          ${d.isCurrentMonth ? "" : "other-month"}
          ${isToday ? "today" : ""}
          `;
          return (
            <div key={idx} className={cellClass}>
              {d.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthlyCalendar;
