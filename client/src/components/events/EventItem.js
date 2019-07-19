import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addAttend, removeAttend } from "../../actions/event";

const EventItem = ({
  event: { _id, title, location, avatar, attend, date }
}) => (
  <div className="bg-white p-1 my-1 event-card">
    <Link to={`/events/${_id}`}>
      <div>
        <h1>{title}</h1>
        <div className="event-subheading">
          <h4>{location}</h4>
          <h4 className="attendees">
            Attending:&nbsp;
            {attend.map(attendee => (
              <img src={attendee.avatar} alt="" className="round-img mt-1" />
            ))}
          </h4>
        </div>
        <p className="post-date">
          Happening on: <Moment format="YYYY/MM/DD">{date}</Moment>
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
  removeAttend: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addAttend, removeAttend }
)(EventItem);
