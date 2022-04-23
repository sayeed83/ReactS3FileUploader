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
  name: "longRunningProcess",
  initialState,
  reducers: {
    longRunningProcessRequested: (longRunningProcess, action) => {
      longRunningProcess.loading = true;
      longRunningProcess.message = null;
      longRunningProcess.status = undefined;
      longRunningProcess.error = {};
    },
    longRunningProcessReceived: (longRunningProcess, action) => {
      longRunningProcess.data = action.payload.data;
      longRunningProcess.loading = false;
      longRunningProcess.lastFetch = Date.now();
      longRunningProcess.message = null;
      longRunningProcess.status = "success";
      longRunningProcess.error = {};
    },
    longRunningProcessRequestFailed: (longRunningProcess, action) => {
      longRunningProcess.loading = false;
      longRunningProcess.message = null;
      longRunningProcess.status = undefined;
      longRunningProcess.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message
    },
    clearMessagesRequested: (longRunningProcess) => {
      longRunningProcess.status = undefined;
      longRunningProcess.message = null;
      longRunningProcess.error = {};
    },
    clearLongRunningProcessStorageRequested: () => initialState,
  },
});

const {
  longRunningProcessRequested,
  longRunningProcessReceived,
  longRunningProcessRequestFailed,
  clearMessagesRequested,
  clearLongRunningProcessStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const getLongRunningProcess = (userId, offset, limit) => (dispatch, getState) => {
  console.log("Invoking getLongRunningProcess Api", userId, offset, limit);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'LONG_RUNNING_PROCESS_LIST',
        userId, offset, limit
      },
      onStart: longRunningProcessRequested.type,
      onSuccess: longRunningProcessReceived.type,
      onError: longRunningProcessRequestFailed.type,
    })
  );
};

export const clearMessages = () => (dispatch) => {
  console.log("in clearMessages...");
  dispatch(clearMessagesRequested());
};

export const clearLongRunningProcessStorage = () => (dispatch) => {
  console.log("in clearLongRunningProcessStorage...");
  dispatch(clearLongRunningProcessStorageRequested());
};
