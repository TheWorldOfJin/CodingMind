import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addEvent } from "../../actions/event";

const EventForm = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    content: "",
    date: ""
  });

  const { title, location, content, date } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="post-form">
      <h1 className="large text-primary">Event</h1>
      <p className="lead">
        <i className="fas fa-user" /> Host your event
      </p>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addEvent(formData);
          setFormData("");
        }}
      >
        <h4 className="form-header">Title</h4>
        <textarea
          name="title"
          cols="30"
          rows="1"
          placeholder="Add a title"
          value={title}
          onChange={e => onChange(e)}
          required
        />
        <h4 className="form-header">Where</h4>
        <textarea
          name="location"
          cols="30"
          rows="1"
          placeholder="Add a location"
          value={location}
          onChange={e => onChange(e)}
          required
        />
        <h4 className="form-header">Event Detail</h4>
        <textarea
          name="content"
          cols="30"
          rows="5"
          placeholder="Add a content"
          value={content}
          onChange={e => onChange(e)}
          required
        />
        <h4 className="form-header">Happening On</h4>
        <input
          type="date"
          name="date"
          value={date}
          onChange={e => onChange(e)}
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEvent }
)(EventForm);
