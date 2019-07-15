import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent } from "../../actions/event";

const EventForm = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    content: ""
  });

  const { title, location, content } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addEvent(formData);
          setFormData("");
        }}
      >
        <textarea
          name="title"
          cols="30"
          rows="1"
          placeholder="Add a title"
          value={title}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name="location"
          cols="30"
          rows="1"
          placeholder="Add a location"
          value={location}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name="content"
          cols="30"
          rows="5"
          placeholder="Add a content"
          value={content}
          onChange={e => onChange(e)}
          required
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
