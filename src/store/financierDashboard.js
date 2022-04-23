import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";

const initialState = {
  data: null,
  loading: false,
  lastFetch: null,
  message: null,
  status: undefined,
  error: {},

  portfolioProfitCount: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  portfolio: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  noContact: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  todaysCollection:{
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  intensity:{
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  activity:{
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  customerConnect:{
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  
};

const slice = createSlice({
  name: "financierDashboard",
  initialState,
  reducers: {
    financierDashboardAmountCollectedRequested: (financierDashboard, action) => {
      console.log("requested");
      financierDashboard.loading = true;
      financierDashboard.status = undefined;
      financierDashboard.message = null;
      financierDashboard.error = {};
    },
    financierDashboardAmountCollectedReceived: (financierDashboard, action) => {
      console.log("Action payload:", action.payload);
      financierDashboard.data = action.payload.data;
      financierDashboard.loading = false;
      financierDashboard.lastFetch = Date.now();
      financierDashboard.message = null;
      financierDashboard.status = "success";
      financierDashboard.error = {};
    },
    financierDashboardAmountCollectedRequestFailed: (financierDashboard, action) => {
      financierDashboard.loading = false;
      financierDashboard.message = null;
      financierDashboard.status = "error";
      financierDashboard.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },
    
    portfolioProfitCountRequested: (financierDashboard, action) => {
      console.log("requested portfolioProfitCountRequested", financierDashboard);
      financierDashboard.portfolioProfitCount.loading = true;
      financierDashboard.portfolioProfitCount.status = undefined;
      financierDashboard.portfolioProfitCount.message = null;
      financierDashboard.portfolioProfitCount.error = {};
    },
    portfolioProfitCountReceived: (financierDashboard, action) => {
      console.log("Action payload:", action.payload);
      financierDashboard.portfolioProfitCount.data = action.payload.data;
      financierDashboard.portfolioProfitCount.loading = false;
      financierDashboard.portfolioProfitCount.lastFetch = Date.now();
      financierDashboard.portfolioProfitCount.message = null;
      financierDashboard.portfolioProfitCount.status = "success";
      financierDashboard.portfolioProfitCount.error = {};
    },
    portfolioProfitCountFailed: (financierDashboard, action) => {
      financierDashboard.portfolioProfitCount.loading = false;
      financierDashboard.portfolioProfitCount.message = null;
      financierDashboard.portfolioProfitCount.status = "error";
      financierDashboard.portfolioProfitCount.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    portfolioRequested: (financierDashboard, action) => {
      console.log("requested portfolioProfitCountRequested", financierDashboard);
      financierDashboard.portfolio.loading = true;
      financierDashboard.portfolio.status = undefined;
      financierDashboard.portfolio.message = null;
      financierDashboard.portfolio.error = {};
    },
    portfolioReceived: (financierDashboard, action) => {
      console.log("Action payload:", action.payload);
      financierDashboard.portfolio.data = action.payload.data;
      financierDashboard.portfolio.loading = false;
      financierDashboard.portfolio.lastFetch = Date.now();
      financierDashboard.portfolio.message = null;
      financierDashboard.portfolio.status = "success";
      financierDashboard.portfolio.error = {};
    },
    portfolioFailed: (financierDashboard, action) => {
      financierDashboard.portfolio.loading = false;
      financierDashboard.portfolio.message = null;
      financierDashboard.portfolio.status = "error";
      financierDashboard.portfolio.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    noContactRequested: (financierDashboard, action) => {
      // console.log("requested noContactRequested", financierDashboard);
      financierDashboard.noContact.loading = true;
      financierDashboard.noContact.status = undefined;
      financierDashboard.noContact.message = null;
      financierDashboard.noContact.error = {};
    },
    noContactReceived: (financierDashboard, action) => {
      console.log("Action payload:", action.payload);
      financierDashboard.noContact.data = action.payload.data;
      financierDashboard.noContact.loading = false;
      financierDashboard.noContact.lastFetch = Date.now();
      financierDashboard.noContact.message = null;
      financierDashboard.noContact.status = "success";
      financierDashboard.noContact.error = {};
    },
    noContactFailed: (financierDashboard, action) => {
      financierDashboard.noContact.loading = false;
      financierDashboard.noContact.message = null;
      financierDashboard.noContact.status = "error";
      financierDashboard.noContact.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    todaysCollectionRequested: (financierDashboard, action) => {
      // console.log("requested noContactRequested", financierDashboard);
      financierDashboard.todaysCollection.loading = true;
      financierDashboard.todaysCollection.status = undefined;
      financierDashboard.todaysCollection.message = null;
      financierDashboard.todaysCollection.error = {};
    },
    todaysCollectionReceived: (financierDashboard, action) => {
      console.log("Action payload:", action.payload);
      financierDashboard.todaysCollection.data = action.payload.data;
      financierDashboard.todaysCollection.loading = false;
      financierDashboard.todaysCollection.lastFetch = Date.now();
      financierDashboard.todaysCollection.message = null;
      financierDashboard.todaysCollection.status = "success";
      financierDashboard.todaysCollection.error = {};
    },
    todaysCollectionFailed: (financierDashboard, action) => {
      financierDashboard.todaysCollection.loading = false;
      financierDashboard.todaysCollection.message = null;
      financierDashboard.todaysCollection.status = "error";
      financierDashboard.todaysCollection.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    intensityRequested: (financierDashboard, action) => {
      // console.log("requested noContactRequested", financierDashboard);
      financierDashboard.intensity.loading = true;
      financierDashboard.intensity.status = undefined;
      financierDashboard.intensity.message = null;
      financierDashboard.intensity.error = {};
    },
    intensityReceived: (financierDashboard, action) => {
      console.log("Action payload:", action.payload);
      financierDashboard.intensity.data = action.payload.data;
      financierDashboard.intensity.loading = false;
      financierDashboard.intensity.lastFetch = Date.now();
      financierDashboard.intensity.message = null;
      financierDashboard.intensity.status = "success";
      financierDashboard.intensity.error = {};
    },
    intensityFailed: (financierDashboard, action) => {
      financierDashboard.intensity.loading = false;
      financierDashboard.intensity.message = null;
      financierDashboard.intensity.status = "error";
      financierDashboard.intensity.error =
        action.payload.response !== null ||
          action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

	activityRequested: (financierDashboard, action) => {
		// console.log("requested noContactRequested", financierDashboard);
		financierDashboard.activity.loading = true;
		financierDashboard.activity.status = undefined;
		financierDashboard.activity.message = null;
		financierDashboard.activity.error = {};
	},
	activityReceived: (financierDashboard, action) => {
		console.log("Action payload:", action.payload);
		financierDashboard.activity.data = action.payload.data;
		financierDashboard.activity.loading = false;
		financierDashboard.activity.lastFetch = Date.now();
		financierDashboard.activity.message = null;
		financierDashboard.activity.status = "success";
		financierDashboard.activity.error = {};
	},
	activityFailed: (financierDashboard, action) => {
		financierDashboard.activity.loading = false;
		financierDashboard.activity.message = null;
		financierDashboard.activity.status = "error";
		financierDashboard.activity.error =
		  action.payload.response !== null ||
			action.payload.response !== undefined
			? action.payload.response.data
			: action.payload.message;
	},

	customerConnectRequested: (financierDashboard, action) => {
		// console.log("requested noContactRequested", financierDashboard);
		financierDashboard.customerConnect.loading = true;
		financierDashboard.customerConnect.status = undefined;
		financierDashboard.customerConnect.message = null;
		financierDashboard.customerConnect.error = {};
	},
	customerConnectReceived: (financierDashboard, action) => {
		// console.log("Action payload:", action.payload);
		financierDashboard.customerConnect.data = action.payload.data;
		financierDashboard.customerConnect.loading = false;
		financierDashboard.customerConnect.lastFetch = Date.now();
		financierDashboard.customerConnect.message = null;
		financierDashboard.customerConnect.status = "success";
		financierDashboard.customerConnect.error = {};
	},
	customerConnectFailed: (financierDashboard, action) => {
		financierDashboard.customerConnect.loading = false;
		financierDashboard.customerConnect.message = null;
		financierDashboard.customerConnect.status = "error";
		financierDashboard.customerConnect.error =
		  action.payload.response !== null ||
			action.payload.response !== undefined
			? action.payload.response.data
			: action.payload.message;
	},

  },
});
const {
  financierDashboardAmountCollectedRequested,
  financierDashboardAmountCollectedReceived,
  financierDashboardAmountCollectedRequestFailed,

  portfolioProfitCountRequested,
  portfolioProfitCountReceived,
  portfolioProfitCountFailed,

  portfolioRequested,
  portfolioReceived,
  portfolioFailed,

  noContactRequested,
  noContactReceived,
  noContactFailed,

  todaysCollectionRequested,
  todaysCollectionReceived,
  todaysCollectionFailed,

  intensityRequested,
  intensityReceived,
  intensityFailed,

  activityRequested,
  activityReceived,
  activityFailed,

  customerConnectRequested,
  customerConnectReceived,
  customerConnectFailed,

} = slice.actions;
export default slice.reducer;

export const financierDashboardAmountCollected = (userId) => (dispatch, getState) => {
  console.log("Invoking financierDashboard Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "FINANCIERS_DASHBOARD_AMOUNT_COLLECTED",
        userId: userId,
      },
      onStart: financierDashboardAmountCollectedRequested.type,
      onSuccess: financierDashboardAmountCollectedReceived.type,
      onError: financierDashboardAmountCollectedRequestFailed.type,
    })
  );
};

export const portfolioProfitCounts = (userId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "FINANCIERS_DASHBOARD_PORTFOLIO_PROFIT_COUNTS",
        userId: userId,
      },
      onStart: portfolioProfitCountRequested.type,
      onSuccess: portfolioProfitCountReceived.type,
      onError: portfolioProfitCountFailed.type,
    })
  );
};

export const portfolios = (userId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "FINANCIERS_DASHBOARD_PORTFOLIO",
        userId: userId,
      },
      onStart: portfolioRequested.type,
      onSuccess: portfolioReceived.type,
      onError: portfolioFailed.type,
    })
  );
};

export const noContacts = (userId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "FINANCIERS_DASHBOARD_NO_CONTACT",
        userId: userId,
      },
      onStart: noContactRequested.type,
      onSuccess: noContactReceived.type,
      onError: noContactFailed.type,
    })
  );
};

export const todaysCollections = (userId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "FINANCIERS_DASHBOARD_TODAYS_COLLECTION",
        userId: userId,
      },
      onStart: todaysCollectionRequested.type,
      onSuccess: todaysCollectionReceived.type,
      onError: todaysCollectionFailed.type,
    })
  );
};

export const intensities = (userId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "FINANCIERS_DASHBOARD_INTENSITY",
        userId: userId,
      },
      onStart: intensityRequested.type,
      onSuccess: intensityReceived.type,
      onError: intensityFailed.type,
    })
  );
};

export const activities = (userId) => (dispatch, getState) => {
  console.log("Invoking portfolio Api", userId);
  //   return;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: "FINANCIERS_DASHBOARD_ACTIVITY",
        userId: userId,
      },
      onStart: activityRequested.type,
      onSuccess: activityReceived.type,
      onError: activityFailed.type,
    })
  );
};

export const customerConnects = (userId) => (dispatch, getState) => {
	console.log("Invoking portfolio Api", userId);
	//   return;
	dispatch(
	  apiCallBegan({
		url: "/api/v1/service",
		method: "post",
		data: {
		  feature: "FINANCIERS_DASHBOARD_CUSTOMER_CONNECT",
		  userId: userId,
		},
		onStart: customerConnectRequested.type,
		onSuccess: customerConnectReceived.type,
		onError: customerConnectFailed.type,
	  })
	);
};


