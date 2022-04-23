import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  data: {},
  loading: false,
  lastFetch: null,
  message: null,
  status: undefined,
  error: {},
}

const slice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadCSVLoanRequested: (upload, action) => {
      upload.loading = true;
      upload.status = undefined;
      upload.message = null;
      upload.error = {};
    },
    uploadCSVLoanReceived: (upload, action) => {
      upload.message = action.payload.message;
      upload.loading = false;
      upload.lastFetch = Date.now();
      upload.status = "success";
      upload.error = {};
    },
    uploadCSVLoanRequestFailed: (upload, action) => {
      upload.loading = false;
      upload.status = "error";
      upload.message = null;
      upload.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    clearMessagesRequested: (upload) => {
      upload.error = {};
      upload.status = undefined;
      upload.message = null;
      upload.loading = false;
    },
    clearUploadStorageRequested: () => initialState
  },
});

const {
  uploadCSVLoanRequested,
  uploadCSVLoanReceived,
  uploadCSVLoanRequestFailed,

  clearMessagesRequested,
  clearUploadStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

//loan csv uploaded post call
export const uploadCSVLoan = (
  userId,
  operation,
  rawData,
  notificationtoken,
  operatingSystem,
  redirectUrl,
  tmeplateId
) => (dispatch, getState) => {
  console.log(
    "Invoking uploadCSVLoan Api with",
    userId,
    operation,
    notificationtoken,
    operatingSystem,
    redirectUrl,
    tmeplateId
    // rawData
  );
  // return false;

  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'FILE_UPLOAD',
        userId,
        operation,
        rawData,
        notificationtoken,
        operatingSystem,
        redirectUrl,
        tmeplateId
      },
      onStart: uploadCSVLoanRequested.type,
      onSuccess: uploadCSVLoanReceived.type,
      onError: uploadCSVLoanRequestFailed.type,
    })
  );
};

export const uploadClearMessages = () => (dispatch) => {
  console.log("in clearMessages...");
  dispatch(clearMessagesRequested());
};

export const clearUploadStorage = () => (dispatch) => {
  console.log("in clearUploadStorage...");
  dispatch(clearUploadStorageRequested());
};
