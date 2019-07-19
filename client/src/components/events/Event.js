import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getEvent, addAttend, removeAttend } from "../../actions/event";

const Event = ({
  getEvent,
  addAttend,
  removeAttend,
  auth,
  event: { event, loading },
  match
}) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent]);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/events" className="btn">
        Back To Events
      </Link>
      <div className="event-header-border">
        <div className="event-header">
          <div className="flex-left">
            <span>
              <Moment format="dddd, MM/DD/YYYY">
                {moment.utc(event.date)}
              </Moment>
            </span>
            <h1 className="header-title">{event.title}</h1>
            <span>
              Hosted by:{" "}
              <Link to={`/profile/${event.user}`} className="host">
                {event.name}
              </Link>
            </span>
          </div>
          <div className="flex-right">
            <h4>Attending?</h4>
            <button
              onClick={() => addAttend(event._id)}
              type="button"
              className="btn btn-success btn-attend"
            >
              Going
            </button>
            <button
              onClick={() => removeAttend(event._id)}
              type="button"
              className="btn btn-danger btn-attend"
            >
              Not Going
            </button>
          </div>
        </div>
      </div>

      <div className="event-content">
        <div className="content-detail">
          <h4 className="mb-1">Event Details</h4>
          <span className="content-body">{event.content}</span>
        </div>

        <div>
          <h4 className="attendee-header">Attending</h4>
          <div className="attendee">
            {event.attend.map(attendee => (
              <img src={attendee.avatar} alt="" className="round-img avatar" />
            ))}
          </div>
          <div className="attendee-name">
            {event.attend.map(attendee => (
              <p className="name">{attendee.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  addAttend: PropTypes.func.isRequired,
  removeAttend: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  { getEvent, addAttend, removeAttend }
)(Event);
