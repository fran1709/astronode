import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './Calendar.css'
import '../components/EventInfo'
import EventInfo from '../components/EventInfo';
import { API } from '../Api_Astronode';

const localizer = momentLocalizer(moment);

const AsCalendar = () => {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  async function obtenerDatos() {
    try {
      var response = await API.get('/astroApi/event');
      const extractedEvents = response.data.results.map((result) => {
        return {
          start: new Date(result.date),
          end: new Date(result.date),
          title: result.name,
          description: result.description,
          location: result.location,
        };
      });
      
      response.data.results.forEach((result) => {
        if (result.launches.length > 0) {
          result.launches.forEach((launch) => {
            extractedEvents.push({
              start: new Date(launch.window_start),
              end: new Date(launch.window_end),
              title: launch.name,
              description: launch.mission.description,
            });
          });
        }
      });
      setEvents(extractedEvents);
    } catch (error) {
      console.log(error);
    }
}

// Llamada cosntante para obtener los datos
useEffect(() => {
obtenerDatos();
}, [])

    const handleEventClick = (event) => {
      setSelectedEvent(event);
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