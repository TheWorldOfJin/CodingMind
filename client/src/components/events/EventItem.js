import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  addAttend,
  removeAttend,
  addEvent,
  deleteEvent
} from "../../actions/event";

const EventItem = ({
  event: { _id, user, title, location, content, name, avatar, attend, date },
  showActions
}) => (
  <div className="bg-white p-1 my-1">
    <Link to={`/events/${_id}`}>
      <div>
        <h1>{title}</h1>
        <div>
          <h4>{location}</h4>
          <h4>
            Attending:{" "}
            <img className="round-img attendees mt-2" src={avatar} alt="" />{" "}
          </h4>
        </div>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
    </Link>
  </div>
);

EventItem.defaultProps = {
  showActions: true
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addAttend: PropTypes.func.isRequired,
  removeAttend: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addAttend, removeAttend, addEvent, deleteEvent }
)(EventItem);
