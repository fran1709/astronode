import React from 'react'
import './EventInfo.css'

const EventInfo = ({ event, onClose }) => {
  const { start, end, title, description, location} = event;
  const startDate = new Date(start);
  const endDate = new Date(end);
  console.log(event);

  // Format the date and time as needed
  const startDateString = startDate.toLocaleDateString();
  const startTimeString = startDate.toLocaleTimeString([], { timeStyle: 'short' });
  const endDateString = endDate.toLocaleDateString();
  const endTimeString = endDate.toLocaleTimeString([], { timeStyle: 'short' });

  return (
    <div className="event-popup">
      <h2 className='header-text'>{title}</h2>
      <p>Description: {description}</p>
      <p>Location: {location}</p>
      <p>
        Date: {startDateString} - {endDateString}
      </p>
      <p>
        Time: {startTimeString} - {endTimeString}
      </p>
      <button className='close-btn' onClick={onClose}>X</button>
    </div>
  );
};

export default EventInfo;
