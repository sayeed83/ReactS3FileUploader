import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  data: null,
  loading: false,
  lastFetch: null,
  message: null,
  status: undefined,
  error: {},
}

const slice = createSlice({
  name: "lookup",
  initialState,
  reducers: {
    lookupRequested: (lookup, action) => {
      lookup.loading = true;
      lookup.message = null;
      lookup.status = undefined;
      lookup.error = {};
    },
    lookupReceived: (lookup, action) => {
      lookup.data = action.payload.data;
      lookup.loading = false;
      lookup.lastFetch = Date.now();
      lookup.message = null;
      lookup.status = "success";
      lookup.error = {};
    },
    lookupRequestFailed: (lookup, action) => {
      lookup.loading = false;
      lookup.message = null;
      lookup.status = undefined;
      lookup.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message
    },
    clearMessagesRequested: (lookup) => {
      lookup.status = undefined;
      lookup.message = null;
      lookup.error = {};
    },
    clearLookupStorageRequested: () => initialState,
  },
});

const {
  lookupRequested,
  lookupReceived,
  lookupRequestFailed,
  clearMessagesRequested,
  clearLookupStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const getLookup = (userId) => (dispatch, getState) => {
  console.log("Invoking Lookup Api", userId);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'LOOKUP'
      },
      onStart: lookupRequested.type,
      onSuccess: lookupReceived.type,
      onError: lookupRequestFailed.type,
    })
  );
};

export const clearMessages = () => (dispatch) => {
  console.log("in clearMessages...");
  dispatch(clearMessagesRequested());
};

export const clearLookupStorage = () => (dispatch) => {
  console.log("in clearLookupStorage...");
  dispatch(clearLookupStorageRequested());
};
