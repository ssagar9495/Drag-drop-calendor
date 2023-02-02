import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./modal.css";
const Modal = () => {
  return (
    <div className="modal">
      <input
        type="text"
        placeholder="Add Title"
        style={{ width: "20%", marginRight: "10px" }}
        //   value={newEvents.title}
        //   onChange={(e) =>
        //     setNewEvents({ ...newEvents, title: e.target.value })
        //   }
      />
      <DatePicker
        placeholder="Start Date"
        //   selected={newEvents.start}
        //   onChange={(start) => setNewEvents({ ...newEvents, start: start })}
        //   style={{ marginRight: "10px" }}
      />
      <DatePicker
        placeholder="End Date"
        //   selected={newEvents.end}
        //   style={{ marginRight: "10px" }}
        //   onChange={(end) => setNewEvents({ ...newEvents, end: end })}
      />
      <button
        style={{ marginTop: "10px" }}
        // onClick={handleAddEvent}
      >
        Add Event
      </button>
    </div>
  );
};
export default Modal;
