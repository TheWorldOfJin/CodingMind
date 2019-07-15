import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getEvent } from "../../actions/event";

const Event = ({
  getEvent,
  addAttend,
  removeAttend,
  addEvent,
  deleteEvent,
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
      <div className="post bg-white p-1 my-1">
        <Link to={`/profile/${event.user}`}>
          <img className="round-img" src={event.avatar} alt="" />
          <h4>{event.name}</h4>
        </Link>
        <h1 className="my-1">{event.title}</h1>
      </div>
      <div>{event.content}</div>
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  { getEvent }
)(Event);
