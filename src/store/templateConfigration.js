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
  name: "templateConfig",
  initialState,
  reducers: {
    templateConfigRequested: (templateConfig, action) => {
      console.log(" templateConfigRequested ");
      templateConfig.loading = true;
      templateConfig.message = null;
      templateConfig.status = undefined;
      templateConfig.error = {};
    },
    templateConfigReceived: (templateConfig, action) => {
      console.log(" action ========== ", action);
      templateConfig.data = action.payload.data;
      templateConfig.loading = false;
      templateConfig.lastFetch = Date.now();
      templateConfig.message = null;
      templateConfig.status = "success";
      templateConfig.error = {};
    },
    templateConfigRequestFailed: (templateConfig, action) => {
      console.log(" templateConfigRequestFailed ");
      templateConfig.loading = false;
      templateConfig.message = null;
      templateConfig.status = undefined;
      templateConfig.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message
    },
    clearMessagesRequested: (templateConfig) => {
      templateConfig.status = undefined;
      templateConfig.message = null;
      templateConfig.error = {};
    },
    clearLookupStorageRequested: () => initialState,
  },
});

const {
  templateConfigRequested,
  templateConfigReceived,
  templateConfigRequestFailed,
  clearMessagesRequested,
  clearLookupStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const templateConfigList = (userId) => (dispatch, getState) => {
  console.log("Invoking templateConfigList Api", userId);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'TEMPLATE_CONFIG_LIST',
        userId
      },
      onStart: templateConfigRequested.type,
      onSuccess: templateConfigReceived.type,
      onError: templateConfigRequestFailed.type,
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
