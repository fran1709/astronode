import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './Calendar.css'
import '../components/EventInfo'
import EventInfo from '../components/EventInfo';

const localizer = momentLocalizer(moment);

const events = [
  {
    start: new Date(2023, 5, 1, 10, 0), // January 1, 2023, 10:00 AM
    end: new Date(2023, 5, 1, 12, 0), // January 1, 2023, 12:00 PM
    title: 'Event 1',
    description: 'Event 1 Description',
    location: 'Event 1 Location',
  },
  {
    start: new Date(2023, 5, 2, 14, 0), // January 2, 2023, 2:00 PM
    end: new Date(2023, 5, 2, 16, 0), // January 2, 2023, 4:00 PM
    title: 'Event 2',
    description: 'Event 1 Description',
    location: 'Event 1 Location',
  },
  // Add more events as needed
];

const AsCalendar = () => {

  const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (event) => {
      setSelectedEvent(event);
      console.log(selectedEvent)
    };

    const handlePopupClose = () => {
      setSelectedEvent(null);
    };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#3dcaa6',
      color: 'white',
    };
    return {
      style,
    };
  };
  
  const CustomHeader = ({ label, onNavigate }) => {
    const handlePrev = () => {
      onNavigate('PREV', );
    };

    const handleNext = () => {
      onNavigate('NEXT');
    };


    return (
      <div className="custom-header">
        <button className="nav-button" onClick={handlePrev}>
          &lt;
        </button>
        <span className="current-month">{label}</span>
        <button className="nav-button" onClick={handleNext}>
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="scroll-container">
      <div className="header">
        <img className="logo" src={require("../media/appLogoS.png")} alt="LogoS" />
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        views={['month']}
        className='custom-calendar'
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
        components={{
          toolbar: CustomHeader,
        }}
      />
      {selectedEvent && (
        <div className='add-response-popup'>
          <EventInfo event={selectedEvent} onClose={handlePopupClose} />
        </div>
      )}   
    </div>
  );
}

export default AsCalendar