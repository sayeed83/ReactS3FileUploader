import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  bucketWisePerformance: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  agencyWisePerformance: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  financierWisePerformance: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  financierStatus: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  agentActivities: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  setDeviceToken: null

}

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    bucketWisePerformanceRequested: (dashboard, action) => {
      dashboard.bucketWisePerformance.loading = true;
      dashboard.bucketWisePerformance.status = undefined;
      dashboard.bucketWisePerformance.message = null;
      dashboard.bucketWisePerformance.error = {};
    },
    bucketWisePerformanceReceived: (dashboard, action) => {
      dashboard.bucketWisePerformance.data = action.payload.data;
      dashboard.bucketWisePerformance.loading = false;
      dashboard.bucketWisePerformance.lastFetch = Date.now();
      dashboard.bucketWisePerformance.message = null;
      dashboard.bucketWisePerformance.status = "success";
      dashboard.bucketWisePerformance.error = {};
    },
    bucketWisePerformanceRequestFailed: (dashboard, action) => {
      dashboard.bucketWisePerformance.loading = false;
      dashboard.bucketWisePerformance.message = null;
      dashboard.bucketWisePerformance.status = "error";
      dashboard.bucketWisePerformance.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },
    agencyWiseperformanceRequested: (dashboard, action) => {
      dashboard.agencyWisePerformance.loading = true;
      dashboard.agencyWisePerformance.status = undefined;
      dashboard.agencyWisePerformance.message = null;
      dashboard.agencyWisePerformance.error = {};
    },
    agencyWiseperformanceReceived: (dashboard, action) => {
      dashboard.agencyWisePerformance.data = action.payload.data;
      dashboard.agencyWisePerformance.loading = false;
      dashboard.agencyWisePerformance.lastFetch = Date.now();
      dashboard.agencyWisePerformance.message = null;
      dashboard.agencyWisePerformance.status = "success";
      dashboard.agencyWisePerformance.error = {};
    },
    agencyWiseperformanceRequestFailed: (dashboard, action) => {
      dashboard.agencyWisePerformance.loading = false;
      dashboard.agencyWisePerformance.message = null;
      dashboard.agencyWisePerformance.status = "error";
      dashboard.agencyWisePerformance.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    financierWiseperformanceRequested: (dashboard, action) => {
      dashboard.financierWisePerformance.loading = true;
      dashboard.financierWisePerformance.status = undefined;
      dashboard.financierWisePerformance.message = null;
      dashboard.financierWisePerformance.error = {};
    },
    financierWiseperformanceReceived: (dashboard, action) => {
      dashboard.financierWisePerformance.data = action.payload.data;
      dashboard.financierWisePerformance.loading = false;
      dashboard.financierWisePerformance.lastFetch = Date.now();
      dashboard.financierWisePerformance.message = null;
      dashboard.financierWisePerformance.status = "success";
      dashboard.financierWisePerformance.error = {};
    },
    financierWiseperformanceRequestFailed: (dashboard, action) => {
      dashboard.financierWisePerformance.loading = false;
      dashboard.financierWisePerformance.message = null;
      dashboard.financierWisePerformance.status = "error";
      dashboard.financierWisePerformance.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    financierStatusRequested: (dashboard, action) => {
      dashboard.financierStatus.loading = true;
      dashboard.financierStatus.status = undefined;
      dashboard.financierStatus.message = null;
      dashboard.financierStatus.error = {};
    },
    financierStatusReceived: (dashboard, action) => {
      dashboard.financierStatus.data = action.payload.data;
      dashboard.financierStatus.loading = false;
      dashboard.financierStatus.lastFetch = Date.now();
      dashboard.financierStatus.message = null;
      dashboard.financierStatus.status = "success";
      dashboard.financierStatus.error = {};
    },
    financierStatusRequestFailed: (dashboard, action) => {
      dashboard.financierStatus.loading = false;
      dashboard.financierStatus.message = null;
      dashboard.financierStatus.status = "error";
      dashboard.financierStatus.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    agentActivitiesRequested: (dashboard, action) => {
      dashboard.agentActivities.loading = true;
      dashboard.agentActivities.status = undefined;
      dashboard.agentActivities.message = null;
      dashboard.agentActivities.error = {};
    },
    agentActivitiesReceived: (dashboard, action) => {
      dashboard.agentActivities.data = action.payload.data;
      dashboard.agentActivities.loading = false;
      dashboard.agentActivities.lastFetch = Date.now();
      dashboard.agentActivities.message = null;
      dashboard.agentActivities.status = "success";
      dashboard.agentActivities.error = {};
    },
    agentActivitiesRequestFailed: (dashboard, action) => {
      dashboard.agentActivities.loading = false;
      dashboard.agentActivities.message = null;
      dashboard.agentActivities.status = "error";
      dashboard.agentActivities.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    setDeviceTokenRequested: (dashboard, action) => {
      dashboard.setDeviceToken = action.payload;
    },

    bucketWiseClearMessagesRequested: (dashboard) => {
      dashboard.bucketWisePerformance.error = {};
      dashboard.bucketWisePerformance.status = undefined;
      dashboard.bucketWisePerformance.message = null;
      dashboard.bucketWisePerformance.loading = false;
    },
    agencyWiseClearMessagesRequested: (dashboard) => {
      dashboard.agencyWisePerformance.error = {};
      dashboard.agencyWisePerformance.status = undefined;
      dashboard.agencyWisePerformance.message = null;
      dashboard.agencyWisePerformance.loading = false;
    },
    financierWiseClearMessagesRequested: (dashboard) => {
      dashboard.financierWisePerformance.error = {};
      dashboard.financierWisePerformance.status = undefined;
      dashboard.financierWisePerformance.message = null;
      dashboard.financierWisePerformance.loading = false;
    },

    financierStatusClearMessagesRequested: (dashboard) => {
      dashboard.financierStatus.error = {};
      dashboard.financierStatus.status = undefined;
      dashboard.financierStatus.message = null;
      dashboard.financierStatus.loading = false;
    },
    agentActivitiesClearMessagesRequested: (dashboard) => {
      dashboard.agentActivities.error = {};
      dashboard.agentActivities.status = undefined;
      dashboard.agentActivities.message = null;
      dashboard.agentActivities.loading = false;
    },
    dashboardClearStorageRequested: () => initialState,
  },
});

const {
  bucketWisePerformanceRequested,
  bucketWisePerformanceReceived,
  bucketWisePerformanceRequestFailed,

  agencyWiseperformanceRequested,
  agencyWiseperformanceReceived,
  agencyWiseperformanceRequestFailed,

  financierWiseperformanceRequested,
  financierWiseperformanceReceived,
  financierWiseperformanceRequestFailed,

  financierStatusRequested,
  financierStatusReceived,
  financierStatusRequestFailed,

  agentActivitiesRequested,
  agentActivitiesReceived,
  agentActivitiesRequestFailed,

  agencyFinancierListRequested,
  agencyFinancierListReceived,
  agencyFinancierListRequestFailed,

  setDeviceTokenRequested,

  bucketWiseClearMessagesRequested,
  agencyWiseClearMessagesRequested,
  financierWiseClearMessagesRequested,
  financierStatusClearMessagesRequested,
  agentActivitiesClearMessagesRequested,

  dashboardClearStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const bucketWisePerformance = (userId, agencyId, startDate, endDate, financierId) => (dispatch, getState) => {
  console.log("Invoking bucketWisePerformance Api", userId, agencyId, startDate, endDate, financierId);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'BUCKETWISE_PERFORMANCE', userId, agencyId, startDate, endDate, financierId },
      onStart: bucketWisePerformanceRequested.type,
      onSuccess: bucketWisePerformanceReceived.type,
      onError: bucketWisePerformanceRequestFailed.type,
    })
  );
};

export const agencyWisePerformance = (userId, agencyId, startDate, endDate) => (dispatch, getState) => {
  console.log("Invoking agencyWisePerformance Api", userId);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'AGENCYWISE_PERFORMANCE', userId, agencyId, startDate, endDate },
      onStart: agencyWiseperformanceRequested.type,
      onSuccess: agencyWiseperformanceReceived.type,
      onError: agencyWiseperformanceRequestFailed.type,
    })
  );
};

export const financierWisePerformance = (userId, agencyId, startDate, endDate, bucketWiseFilter) => (dispatch, getState) => {
  console.log("Invoking financierWisePerformance Api", userId);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'FINANCIERWISE_PERFORMANCE', userId, agencyId, startDate, endDate, bucketWiseFilter },
      onStart: financierWiseperformanceRequested.type,
      onSuccess: financierWiseperformanceReceived.type,
      onError: financierWiseperformanceRequestFailed.type,
    })
  );
};

export const financierStatus = (userId, agencyId, startDate, endDate, financierId) => (dispatch, getState) => {
  console.log("Invoking financierStatus Api", userId, agencyId, startDate, endDate, financierId);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'DASHBOARD_FINANCIER_STATUS', userId, agencyId, startDate, endDate,financierId },
      onStart: financierStatusRequested.type,
      onSuccess: financierStatusReceived.type,
      onError: financierStatusRequestFailed.type,
    })
  );
};

export const getAgentActivities = (userId, startDate, endDate) => (dispatch, getState) => {
  console.log("Invoking agentActivities Api", userId, startDate, endDate);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'AGENT_ACTIVITIES', userId, startDate, endDate },
      onStart: agentActivitiesRequested.type,
      onSuccess: agentActivitiesReceived.type,
      onError: agentActivitiesRequestFailed.type,
    })
  );
};

export const setToken = (data) => (dispatch, getState) => {
  dispatch(setDeviceTokenRequested(data));
};

export const bucketWisePerformanceClearMessages = () => (dispatch) => {
  console.log("in bucketWisePerformanceClearMessages...");
  dispatch(bucketWiseClearMessagesRequested());
};

export const agencyWisePerformanceClearMessages = () => (dispatch) => {
  console.log("in agencyWisePerformanceClearMessages...");
  dispatch(agencyWiseClearMessagesRequested());
};

export const financierWisePerformanceClearMessages = () => (dispatch) => {
  console.log("in financierWisePerformanceClearMessages...");
  dispatch(financierWiseClearMessagesRequested());
};

export const financierStatusClearMessages = () => (dispatch) => {
  console.log("in financierStatusClearMessages...");
  dispatch(financierStatusClearMessagesRequested());
};

export const agentActivitiesClearMessages = () => (dispatch) => {
  console.log("in agentActivitiesClearMessages...");
  dispatch(agentActivitiesClearMessagesRequested());
};

export const dashboardClearStorage = () => (dispatch) => {
  console.log("in dashboardClearStorage...");
  dispatch(dashboardClearStorageRequested());
};