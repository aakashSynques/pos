import React from "react";

const CurrentDate = () => {
  function getCurrentDateFormatted() {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${dayOfMonth} ${month}, ${year} ${dayOfWeek}`;
  }

  // Usage
  const formattedDate = getCurrentDateFormatted();

    return <>
        <span className="text-decoration-underline">
            {formattedDate}
            </span>
    </>;
};

export default CurrentDate;
