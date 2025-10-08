import React from "react";

function WeekDay({ name }) {
  return (
    <div className="week-day">
      <div className="day-events">Wydarzenia w dniu {name}</div>
    </div>
  );
}

export default WeekDay;
