import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EVENTS,
  EVENT_ERROR,
  DELETE_EVENT,
  ADD_EVENT,
  GET_EVENT,
  UPDATE_ATTEND
} from "./types";

// Get events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events");

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete event
export const deleteEvent = id => async dispatch => {
  try {
    await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id
    });

    dispatch(setAlert("Event Removed", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add event
export const addEvent = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/events", formData, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert("Event Created", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get event
export const getEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Attend event
export const addAttend = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/attend/${id}`);

    dispatch({
      type: UPDATE_ATTEND,
      payload: { id, attend: res.data }
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Unattend Event
export const removeAttend = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/unattend/${id}`);

    dispatch({
      type: UPDATE_ATTEND,
      payload: { id, attend: res.data }
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
