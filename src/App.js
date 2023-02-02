import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import events from "./events";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);
const App = (props) => {
  const [newEvents, setNewEvents] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const checkColor = (allEvents) => {
    switch (allEvents.status) {
      case 1:
        return "Lightgreen";
      case 2:
        return "blue";
      case 3:
        return "yellow";
      case 4:
        return "red";
      default:
        return "foo";
    }
  };

  const handleAddEvent = () => {
    setAllEvents((allEvents) => [...allEvents, newEvents]);
  };

  const handleSelectSlot = ({ start, end }) => {
    ///open a modal
  };

  const onEventDrop = ({ event, start, end }) => {
    const tempEvents = allEvents;
    const idx = tempEvents.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...allEvents];
    nextEvents.splice(idx, 1, updatedEvent);

    setAllEvents(nextEvents);
  };
  const onEventResize = ({ event, start, end }) => {
    const tempEvents = allEvents;
    const nextEvents = tempEvents.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setAllEvents(nextEvents);
  };

  console.log(allEvents, "check");

  return (
    <div>
      <div>Calender</div>
      <h2>Add New Events</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvents.title}
          onChange={(e) =>
            setNewEvents({ ...newEvents, title: e.target.value })
          }
        />
        <DatePicker
          placeholder="Start Date"
          selected={newEvents.start}
          onChange={(start) => setNewEvents({ ...newEvents, start: start })}
          style={{ marginRight: "10px" }}
        />
        <DatePicker
          placeholder="End Date"
          selected={newEvents.end}
          style={{ marginRight: "10px" }}
          onChange={(end) => setNewEvents({ ...newEvents, end: end })}
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>

      <DragAndDropCalendar
        selectable
        resizable
        localizer={localizer}
        events={allEvents}
        onSelectSlot={handleSelectSlot}
        startAccessor="start"
        endAccessor="end"
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        style={{ height: 500 }}
        defaultView="month"
        eventPropGetter={(allEvents) => {
          const backgroundColor = checkColor(allEvents);
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
};

export default App;
