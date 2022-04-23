import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";

const initialState = {
  hasMore: true,
  offset: 0,
  limit: 25,
  loading: false,
  lastFetch: null,
  message: null,
  searchDataFound: false,
  searchLoanId: null,
  status: undefined,
  error: {},
  eventList: {
    data: [],
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
};

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    
    addEventsReuested: (events, action) => {
      events.loading = true;
      events.status = undefined;
      events.message = null;
      events.error = {};
    },
    addEventsRecieved: (events, action) => {
      events.message = action.payload.message;
      events.loading = false;
      events.lastFetch = Date.now();
      events.status = "success";
      events.error = {};
    },
    addEventsFailed: (events, action) => {
      events.loading = false;
      events.status = "error";
      events.message = action.payload.message ? action.payload.message : '';
      events.error =
        action.payload.response != null || action.payload.response != undefined
          ? action.payload.response.data
          : action.payload.message;
    },
    eventListRequested: (events, action) => {
      console.log(" eventList =========== ", events);
      events.eventList.loading = true;
      events.eventList.status = undefined;
      events.eventList.message = null;
      events.eventList.error = {};
    },
    eventListReceived: (events, action) => {
      events.eventList.data = action.payload.data;
      events.eventList.message = action.payload.message;
      events.eventList.loading = false;
      events.eventList.lastFetch = Date.now();
      events.eventList.status = "success";
      events.eventList.error = {};
    },
    eventListRequestFailed: (events, action) => {
      console.log(" eventList ", events);
      events.eventList.loading = false;
      events.eventList.status = "error";
      events.eventList.message = action.payload.message ? action.payload.message : '';
      events.eventList.error =
        action.payload.response != null || action.payload.response != undefined
          ? action.payload.response.data
          : action.payload.message;
    }
  },
});

const {
  addEventsReuested,
  addEventsRecieved,
  addEventsFailed,
  eventListRequested,
  eventListReceived,
  eventListRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

export const addEvents = (eventType, userId, financierId, agencyId, loanId, addDispostion, notificationSend) => (dispatch, getState) => {
  console.log("Invoking addEvents Api", eventType, userId, financierId, agencyId, loanId, addDispostion, notificationSend);
  const state = getState();
//   const { latitude, longitude, appversion } = state.entities.user;
  
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'ADD_EVENT',
        eventType, userId, financierId, agencyId, loanId, notificationSend
      },
    //   headers: { latitude, longitude, appversion },
      onStart: addEventsReuested.type,
      onSuccess: addEventsRecieved.type,
      onError: addEventsFailed.type,
    })
  );
};

export const eventList = (userId) => (dispatch, getState) => {
  console.log("Invoking agencyFinancierList Api", userId);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'CHECK_ADD_DISPOSTION',
        userId
      },
      onStart: eventListRequested.type,
      onSuccess: eventListReceived.type,
      onError: eventListRequestFailed.type,
    })
  );
};
