import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";

const initialState = {
  data: null,
  loading: false,
  lastFetch: null,
  message: null,
  status: undefined,
  error: {},

  portfolio_view: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },

  bucketWisePerformance: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },

  portfolioGoeState: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },

  portfolioGoeCity: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },

  portfolioGoeDistrict: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },

  posDistribution: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  posExpectedCollection:{
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  
};

const slice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    summaryRequested: (summary, action) => {
      console.log("requested");
      summary.loading = true;
      summary.status = undefined;
      summary.message = null;
      summary.error = {};
    },
    summaryReceived: (summary, action) => {
      console.log("Action payload:", action.payload);
      summary.data = action.payload.data;
      summary.loading = false;
      summary.lastFetch = Date.now();
      summary.message = null;
      summary.status = "success";
      summary.error = {};
    },
    summaryRequestFailed: (summary, action) => {
      summary.loading = false;
      summary.message = null;
      summary.status = "error";
      summary.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    portfolioRequested: (summary, action) => {
      console.log("requested");
      summary.portfolio_view.loading = true;
      summary.portfolio_view.status = undefined;
      summary.portfolio_view.message = null;
      summary.portfolio_view.error = {};
    },
    portfolioReceived: (summary, action) => {
      console.log("Portfolio Action payload:", action.payload);
      summary.portfolio_view.data = action.payload.data;
      summary.portfolio_view.loading = false;
      summary.portfolio_view.lastFetch = Date.now();
      summary.portfolio_view.message = null;
      summary.portfolio_view.status = "success";
      summary.portfolio_view.error = {};
    },
    portfolioRequestFailed: (summary, action) => {
      summary.portfolio_view.loading = false;
      summary.portfolio_view.message = null;
      summary.portfolio_view.status = "error";
      summary.portfolio_view.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    bucketWisePerformanceRequested: (summary, action) => {
      summary.bucketWisePerformance.loading = true;
      summary.bucketWisePerformance.status = undefined;
      summary.bucketWisePerformance.message = null;
      summary.bucketWisePerformance.error = {};
    },
    bucketWisePerformanceReceived: (summary, action) => {
      summary.bucketWisePerformance.data = action.payload.data;
      summary.bucketWisePerformance.loading = false;
      summary.bucketWisePerformance.lastFetch = Date.now();
      summary.bucketWisePerformance.message = null;
      summary.bucketWisePerformance.status = "success";
      summary.bucketWisePerformance.error = {};
    },
    bucketWisePerformanceRequestFailed: (summary, action) => {
      summary.bucketWisePerformance.loading = false;
      summary.bucketWisePerformance.message = null;
      summary.bucketWisePerformance.status = "error";
      summary.bucketWisePerformance.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    portfolioGeographyStateWiseRequested: (summary, action) => {
      console.log("requested");
      summary.portfolioGoeState.loading = true;
      summary.portfolioGoeState.status = undefined;
      summary.portfolioGoeState.message = null;
      summary.portfolioGoeState.error = {};
    },
    portfolioGeographyStateWiseReceived: (summary, action) => {
      console.log("Portfolio Action payload:", action.payload);
      summary.portfolioGoeState.data = action.payload.data;
      summary.portfolioGoeState.loading = false;
      summary.portfolioGoeState.lastFetch = Date.now();
      summary.portfolioGoeState.message = null;
      summary.portfolioGoeState.status = "success";
      summary.portfolioGoeState.error = {};
    },
    portfolioGeographyStateWiseRequestFailed: (summary, action) => {
      summary.portfolioGoeState.loading = false;
      summary.portfolioGoeState.message = null;
      summary.portfolioGoeState.status = "error";
      summary.portfolioGoeState.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    portfolioGeographyCityWiseRequested: (summary, action) => {
      console.log("requested");
      summary.portfolioGoeCity.loading = true;
      summary.portfolioGoeCity.status = undefined;
      summary.portfolioGoeCity.message = null;
      summary.portfolioGoeCity.error = {};
    },
    portfolioGeographyCityWiseReceived: (summary, action) => {
      console.log("Portfolio Action payload:", action.payload);
      summary.portfolioGoeCity.data = action.payload.data;
      summary.portfolioGoeCity.loading = false;
      summary.portfolioGoeCity.lastFetch = Date.now();
      summary.portfolioGoeCity.message = null;
      summary.portfolioGoeCity.status = "success";
      summary.portfolioGoeCity.error = {};
    },
    portfolioGeographyCityWiseRequestFailed: (summary, action) => {
      summary.portfolioGoeCity.loading = false;
      summary.portfolioGoeCity.message = null;
      summary.portfolioGoeCity.status = "error";
      summary.portfolioGoeCity.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    portfolioGeographyDistrictWiseRequested: (summary, action) => {
      console.log("requested");
      summary.portfolioGoeDistrict.loading = true;
      summary.portfolioGoeDistrict.status = undefined;
      summary.portfolioGoeDistrict.message = null;
      summary.portfolioGoeDistrict.error = {};
    },
    portfolioGeographyDistrictWiseReceived: (summary, action) => {
      console.log("Portfolio Action payload:", action.payload);
      summary.portfolioGoeDistrict.data = action.payload.data;
      summary.portfolioGoeDistrict.loading = false;
      summary.portfolioGoeDistrict.lastFetch = Date.now();
      summary.portfolioGoeDistrict.message = null;
      summary.portfolioGoeDistrict.status = "success";
      summary.portfolioGoeDistrict.error = {};
    },
    portfolioGeographyDistrictWiseRequestFailed: (summary, action) => {
      summary.portfolioGoeDistrict.loading = false;
      summary.portfolioGoeDistrict.message = null;
      summary.portfolioGoeDistrict.status = "error";
      summary.portfolioGoeDistrict.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    posDistributionRequested: (summary, action) => {
      summary.posDistribution.loading = true;
      summary.posDistribution.status = undefined;
      summary.posDistribution.message = null;
      summary.posDistribution.error = {};
    },
    posDistributionReceived: (summary, action) => {
      summary.posDistribution.data = action.payload.data;
      summary.posDistribution.loading = false;
      summary.posDistribution.lastFetch = Date.now();
      summary.posDistribution.message = null;
      summary.posDistribution.status = "success";
      summary.posDistribution.error = {};
    },
    posDistributionRequestFailed: (summary, action) => {
      summary.posDistribution.loading = false;
      summary.posDistribution.message = null;
      summary.posDistribution.status = "error";
      summary.posDistribution.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    bucketWiseClearMessagesRequested: (summary) => {
      summary.bucketWisePerformance.error = {};
      summary.bucketWisePerformance.status = undefined;
      summary.bucketWisePerformance.message = null;
      summary.bucketWisePerformance.loading = false;
    },
    portfolioGoeStateClearMessagesRequested: (summary) => {
      summary.portfolioGoeState.error = {};
      summary.portfolioGoeState.status = undefined;
      summary.portfolioGoeState.message = null;
      summary.portfolioGoeState.loading = false;
    },
    portfolioGoeCityClearMessagesRequested: (summary) => {
      summary.portfolioGoeCity.error = {};
      summary.portfolioGoeCity.status = undefined;
      summary.portfolioGoeCity.message = null;
      summary.portfolioGoeCity.loading = false;
    },
    portfolioGoeDistrictClearMessagesRequested: (summary) => {
      summary.portfolioGoeDistrict.error = {};
      summary.portfolioGoeDistrict.status = undefined;
      summary.portfolioGoeDistrict.message = null;
      summary.portfolioGoeDistrict.loading = false;
    },
    posDistributionClearMessagesRequested: (summary) => {
      summary.posDistribution.error = {};
      summary.posDistribution.status = undefined;
      summary.posDistribution.message = null;
      summary.posDistribution.loading = false;
    },

    posExpectedCollectionRequested: (summary, action) => {
      console.log("requested");
      summary.posExpectedCollection.loading = true;
      summary.posExpectedCollection.status = undefined;
      summary.posExpectedCollection.message = null;
      summary.posExpectedCollection.error = {};
    },
    posExpectedCollectionReceived: (summary, action) => {
      console.log("Portfolio Action payload:", action.payload);
      summary.posExpectedCollection.data = action.payload.data;
      summary.posExpectedCollection.loading = false;
      summary.posExpectedCollection.lastFetch = Date.now();
      summary.posExpectedCollection.message = null;
      summary.posExpectedCollection.status = "success";
      summary.posExpectedCollection.error = {};
    },
    posExpectedCollectionFailed: (summary, action) => {
      summary.posExpectedCollection.loading = false;
      summary.posExpectedCollection.message = null;
      summary.posExpectedCollection.status = "error";
      summary.posExpectedCollection.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },
    
  },
});
const {
  summaryRequested,
  summaryReceived,
  summaryRequestFailed,

  portfolioRequested,
  portfolioReceived,
  portfolioRequestFailed,

  bucketWisePerformanceRequested,
  bucketWisePerformanceReceived,
  bucketWisePerformanceRequestFailed,

  portfolioGeographyStateWiseRequested,
  portfolioGeographyStateWiseReceived,
  portfolioGeographyStateWiseRequestFailed,

  portfolioGeographyCityWiseRequested,
  portfolioGeographyCityWiseReceived,
  portfolioGeographyCityWiseRequestFailed,

  portfolioGeographyDistrictWiseRequested,
  portfolioGeographyDistrictWiseReceived,
  portfolioGeographyDistrictWiseRequestFailed,

  posDistributionRequested,
  posDistributionReceived,
  posDistributionRequestFailed,

  bucketWiseClearMessagesRequested,
  portfolioGoeStateClearMessagesRequested,
  portfolioGoeCityClearMessagesRequested,
  portfolioGoeDistrictClearMessagesRequested,
  posDistributionClearMessagesRequested,

  posExpectedCollectionRequested,
  posExpectedCollectionReceived,
  posExpectedCollectionFailed,
} = slice.actions;
export default slice.reducer;

export const summary = (userId, agencyId) => (dispatch, getState) => {
  console.log("Invoking summary Api", userId, agencyId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "WELCOME",
        userId: userId,
      },
      onStart: summaryRequested.type,
      onSuccess: summaryReceived.type,
      onError: summaryRequestFailed.type,
    })
  );
};

export const portfolio = (userId,financierId,startDate,endDate) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "PRTFOLIO_VIEW",
        userId: userId,
        financierId,
        startDate,
        endDate
      },
      onStart: portfolioRequested.type,
      onSuccess: portfolioReceived.type,
      onError: portfolioRequestFailed.type,
    })
  );
};

export const bucketWisePerformance = (userId, financierId, startDate, endDate) => (dispatch, getState) => {
  console.log("Invoking bucketWisePerformance Api", userId, financierId);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'DPD_DISTRIBUTION', userId, financierId, startDate,endDate },
      onStart: bucketWisePerformanceRequested.type,
      onSuccess: bucketWisePerformanceReceived.type,
      onError: bucketWisePerformanceRequestFailed.type,
    })
  );
};

export const portfolioGeographyStateWise = (userId, financierId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "PRTFOLIO_GEOGRAPHY_STATE_WISE",
        userId: userId,
        financierId: financierId
      },
      onStart: portfolioGeographyStateWiseRequested.type,
      onSuccess: portfolioGeographyStateWiseReceived.type,
      onError: portfolioGeographyStateWiseRequestFailed.type,
    })
  );
};

export const portfolioGeographyCityWise = (userId, financierId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "PRTFOLIO_GEOGRAPHY_CITY_WISE",
        userId: userId,
        financierId: financierId
      },
      onStart: portfolioGeographyCityWiseRequested.type,
      onSuccess: portfolioGeographyCityWiseReceived.type,
      onError: portfolioGeographyCityWiseRequestFailed.type,
    })
  );
};

export const portfolioGeographyDistrictWise = (userId, financierId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "PRTFOLIO_GEOGRAPHY_DISTRICT_WISE",
        userId: userId,
        financierId: financierId
      },
      onStart: portfolioGeographyDistrictWiseRequested.type,
      onSuccess: portfolioGeographyDistrictWiseReceived.type,
      onError: portfolioGeographyDistrictWiseRequestFailed.type,
    })
  );
};

export const posDistribution = (userId, financierId) => (dispatch, getState) => {
  console.log("Invoking bucketWisePerformance Api", userId, financierId);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'POS_DISTRIBUTION', userId, financierId },
      onStart: posDistributionRequested.type,
      onSuccess: posDistributionReceived.type,
      onError: posDistributionRequestFailed.type,
    })
  );
};

export const portfolioExpectedCollections = (userId) => (dispatch, getState) => {
  console.log("Invoking bucketWisePerformance Api", userId);

  dispatch(
    apiCallBegan({
      url: '/api/v1/service',
      method: 'post',
      data: { feature: 'PRTFOLIO_EXPECTED_COLLECTION_COUNT', userId },
      onStart: posExpectedCollectionRequested.type,
      onSuccess: posExpectedCollectionReceived.type,
      onError: posExpectedCollectionFailed.type,
    })
  );
};

export const bucketWisePerformanceClearMessages = () => (dispatch) => {
  console.log("in bucketWisePerformanceClearMessages...");
  dispatch(bucketWiseClearMessagesRequested());
};

export const portfolioGoeStateClearMessages = () => (dispatch) => {
  console.log("in portfolioGoeStateClearMessagesRequested...");
  dispatch(portfolioGoeStateClearMessagesRequested());
};

export const portfolioGoeCityClearMessages = () => (dispatch) => {
  console.log("in portfolioGoecityClearMessagesRequested...");
  dispatch(portfolioGoeCityClearMessagesRequested());
};
export const portfolioGoeDistrictClearMessages = () => (dispatch) => {
  console.log("in portfolioGoeDistrictClearMessagesRequested...");
  dispatch(portfolioGoeDistrictClearMessagesRequested());
};
export const posDistributionClearMessages = () => (dispatch) => {
  console.log("in posDistributionClearMessagesRequested...");
  dispatch(posDistributionClearMessagesRequested());
};