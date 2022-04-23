import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";

const initialState = {
  data: {
    loans: []
  },
  citiesWiseLoan: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  citiesWiseLoanForMarker: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  agenciesFinanciersList: {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
  },
  filterData: [],
  loading: false,
  lastFetch: null,
  message: null,
  status: undefined,
  error: {}
}

const slice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    loanRequested: (loan, action) => {
      console.log('loan req initial')
      loan.loading = true;
      loan.status = undefined;
      loan.message = null;
      loan.error = {};
    },
    loanReceived: (loan, action) => {
      let loanData = original(loan.data.loans);
      let adjustedArray = [];
      console.log('loan Data Initial Length:', loanData.length)
      loan.total = action.payload.data.total;
      loan.batchRange = action.payload.data.batchRange;
      loan.batchSize = action.payload.data.batchSize;
      loan.limit = action.payload.data.limit;
      loan.offset = action.payload.data.offset;
      loan.hasMore = action.payload.data.hasMore;

      let found = false;
      let a = 0;
      for (let i = 0; i < loanData.length; i++) {
        for (let k = 0; k < action.payload.data.loan.length; k++) {
          if (loanData[i].clientId == action.payload.data.loan[k].clientId) {
            found = true;
          }
        }
        if (!found) {
          adjustedArray[a] = loanData[i];
          a++;
        }
      }
      //console.log('Adjusted Array ', adjustedArray)
      //console.log('API Array ', action.payload.data.loan)

      loan.data.loans = [...adjustedArray, ...action.payload.data.loan];
      //loan.data.loans.push(action.payload.data.loan);
      loan.loading = false;
      loan.lastFetch = Date.now();
      loan.status = "success";
      loan.message = null;
      loan.error = {};
    },
    loanRequestFailed: (loan, action) => {
      loan.loading = false;
      loan.status = "error";
      loan.message = null;
      loan.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    createCollectionRequested: (loan, action) => {
      loan.loading = true;
      loan.status = undefined;
      loan.message = null;
      loan.error = {};
    },
    createCollectionReceived: (loan, action) => {
      let loanData = original(loan.data);
      loanData.filter((item, index) => {
        if (item.clientId == action.payload.data[0].clientId) {
          loan.data.splice(index, 1, action.payload.data[0]);
        }
        return loanData;
      });
      loan.message = action.payload.message;
      loan.loading = false;
      loan.lastFetch = Date.now();
      loan.status = "success";
      loan.error = {};
    },
    createCollectionRequestFailed: (loan, action) => {
      loan.loading = false;
      loan.status = "error";
      loan.message = null;
      loan.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    citiesLoanCountRequested: (loan, action) => {
      loan.citiesWiseLoan.loading = true;
      loan.citiesWiseLoan.status = undefined;
      loan.citiesWiseLoan.message = null;
      loan.citiesWiseLoan.error = {};
    },
    citiesLoanCountReceived: (loan, action) => {
      let cityWiseDataCopy = original(loan.citiesWiseLoan)
      console.log(" cityWiseDataCopy befor ======== ", cityWiseDataCopy.data);
      if(cityWiseDataCopy.data && cityWiseDataCopy.data && cityWiseDataCopy.data.loan) {
        cityWiseDataCopy = cityWiseDataCopy.data.loan
      } else {
        cityWiseDataCopy = '';
      }
      
      console.log(" action.payload ======== ", action.payload.data)
      console.log(" cityWiseDataCopy ======== ", cityWiseDataCopy)
      if(cityWiseDataCopy)
        loan.citiesWiseLoan.data.loan = [...cityWiseDataCopy, ...action.payload.data.loan];
      else
        loan.citiesWiseLoan.data = action.payload.data;
        
      loan.citiesWiseLoan.total = action.payload.data.total;
      loan.citiesWiseLoan.batchRange = action.payload.data.batchRange;
      loan.citiesWiseLoan.batchSize = action.payload.data.batchSize;
      loan.citiesWiseLoan.limit = action.payload.data.limit;
      loan.citiesWiseLoan.offset = action.payload.data.offset;
      loan.citiesWiseLoan.hasMore = action.payload.data.hasMore;
      loan.citiesWiseLoan.loading = false;
      loan.citiesWiseLoan.lastFetch = Date.now();
      loan.citiesWiseLoan.status = "success";
      loan.citiesWiseLoan.message = null;
      loan.citiesWiseLoan.error = {};

      console.log(" loan.citiesWiseLoan ======== ", loan.citiesWiseLoan.data)

    },
    searchCitiesLoanCountReceived: (loan, action) => {
      loan.citiesWiseLoan.data = action.payload.data; 
      loan.citiesWiseLoan.total = action.payload.data.total;
      loan.citiesWiseLoan.batchRange = action.payload.data.batchRange;
      loan.citiesWiseLoan.batchSize = action.payload.data.batchSize;
      loan.citiesWiseLoan.limit = action.payload.data.limit;
      loan.citiesWiseLoan.offset = action.payload.data.offset;
      loan.citiesWiseLoan.hasMore = action.payload.data.hasMore;
      loan.citiesWiseLoan.loading = false;
      loan.citiesWiseLoan.lastFetch = Date.now();
      loan.citiesWiseLoan.status = "success";
      loan.citiesWiseLoan.message = null;
      loan.citiesWiseLoan.error = {};

    },
    citiesLoanCountRequestFailed: (loan, action) => {
      console.log(" action citiesLoanCountRequestFailed ======== ", action.payload)
      loan.citiesWiseLoan.loading = false;
      loan.citiesWiseLoan.status = "error";
      loan.citiesWiseLoan.message = null;
      loan.citiesWiseLoan.error = "something went wrong";
        // action.payload.response !== null || action.payload.response !== undefined
        //   ? action.payload.response.error ? action.payload.response.error
        //   : action.payload.message : action.payload.message;
    },
    citiesWiseLoanForMarkerRequested: (loan, action) => {
      loan.citiesWiseLoanForMarker.loading = true;
      loan.citiesWiseLoanForMarker.status = undefined;
      loan.citiesWiseLoanForMarker.message = null;
      loan.citiesWiseLoanForMarker.error = {};
    },
    citiesWiseLoanForMarkerReceived: (loan, action) => {
      loan.citiesWiseLoanForMarker.data = action.payload.data; 
      loan.citiesWiseLoanForMarker.total = action.payload.data.total;
      loan.citiesWiseLoanForMarker.batchRange = action.payload.data.batchRange;
      loan.citiesWiseLoanForMarker.batchSize = action.payload.data.batchSize;
      loan.citiesWiseLoanForMarker.limit = action.payload.data.limit;
      loan.citiesWiseLoanForMarker.offset = action.payload.data.offset;
      loan.citiesWiseLoanForMarker.hasMore = action.payload.data.hasMore;
      loan.citiesWiseLoanForMarker.loading = false;
      loan.citiesWiseLoanForMarker.lastFetch = Date.now();
      loan.citiesWiseLoanForMarker.status = "success";
      loan.citiesWiseLoanForMarker.message = null;
      loan.citiesWiseLoanForMarker.error = {};

    },
    citiesWiseLoanForMarkerFailed: (loan, action) => {
      console.log(" action citiesLoanCountRequestFailed ======== ", action.payload)
      loan.citiesWiseLoanForMarker.loading = false;
      loan.citiesWiseLoanForMarker.status = "error";
      loan.citiesWiseLoanForMarker.message = null;
      loan.citiesWiseLoanForMarker.error = "something went wrong";
        // action.payload.response !== null || action.payload.response !== undefined
        //   ? action.payload.response.error ? action.payload.response.error
        //   : action.payload.message : action.payload.message;
    },

    agencyFinancierListRequested: (loan, action) => {
      loan.agenciesFinanciersList.loading = true;
      loan.agenciesFinanciersList.status = undefined;
      loan.agenciesFinanciersList.message = null;
      loan.agenciesFinanciersList.error = {};
    },
    agencyFinancierListReceived: (loan, action) => {
      loan.agenciesFinanciersList.data = action.payload.data;
      loan.agenciesFinanciersList.loading = false;
      loan.agenciesFinanciersList.lastFetch = Date.now();
      loan.agenciesFinanciersList.message = null;
      loan.agenciesFinanciersList.status = "success";
      loan.agenciesFinanciersList.error = {};
    },
    agencyFinancierListRequestFailed: (loan, action) => {
      loan.agenciesFinanciersList.loading = false;
      loan.agenciesFinanciersList.message = null;
      loan.agenciesFinanciersList.status = "error";
      loan.agenciesFinanciersList.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    setFilterData: (loan, action) => {
      loan.filterData = action.payload;
    },

    clearMessagesRequested: (loan) => {
      loan.status = undefined;
      loan.message = null;
      loan.error = {};
    },
    clearCitiwiseStorages: (loan) => {
      loan.citiesWiseLoan.loading = true;
      loan.citiesWiseLoan.status = undefined;
      loan.citiesWiseLoan.message = null;
      loan.citiesWiseLoan.error = {};
    },
    clearLoanStorageRequested: () => initialState,
  },
});

const {
  loanRequested,
  loanReceived,
  loanRequestFailed,

  createCollectionRequested,
  createCollectionReceived,
  createCollectionRequestFailed,

  setFilterData,

  citiesLoanCountRequested,
  citiesLoanCountReceived,
  searchCitiesLoanCountReceived,
  citiesLoanCountRequestFailed,

  agencyFinancierListRequested,
  agencyFinancierListReceived,
  agencyFinancierListRequestFailed,

  clearMessagesRequested,
  clearLoanStorageRequested,
  clearCitiwiseStorages,

  citiesWiseLoanForMarkerRequested,
  citiesWiseLoanForMarkerReceived,
  citiesWiseLoanForMarkerFailed
} = slice.actions;
export default slice.reducer;

// Action Creators

export const loan = (userId, agencyId, offset, limit) => (dispatch, getState) => {
  console.log("Invoking loan Api", userId, agencyId, offset, limit);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'LOAN_LIST',
        userId, agencyId, offset, limit
      },
      onStart: loanRequested.type,
      onSuccess: loanReceived.type,
      onError: loanRequestFailed.type,
    })
  );
};


export const createCollection = (
  userId,
  agencyId,
  loanId,
  amount,
  email,
  telephone
) => (dispatch, getState) => {
  console.log(
    "Invoking createCollection Api with",
    userId,
    agencyId,
    loanId,
    amount,
    email,
    telephone
  );
  const state = getState();
  // const { latitude, longitude } = state.entities.user;
  // console.log(latitude, longitude);
  let latitude = 12, longitude = 45;
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      headers: { latitude, longitude },
      data: {
        feature: 'CREATE_COLLECTION',
        userId,
        agencyId,
        loanId,
        amount,
        email,
        telephone
      },
      onStart: createCollectionRequested.type,
      onSuccess: createCollectionReceived.type,
      onError: createCollectionRequestFailed.type,
    })
  );
};

export const citiesLoanCount = (userId,startDate, endDate, offset, limit, search) => (dispatch, getState) => {
  console.log("Invoking citiesLoanCount Api");
  dispatch(
    apiCallBegan({
      // url: `/api/v1/case?userId=${userId}&agencyId=${agencyId}`,
      url: "/api/v1/service",
      method: "post",
      data: {
        userId,
        feature: 'LOAN_CITIES',
        startDate,
        endDate,
        offset,
        limit
      },
      onStart: citiesLoanCountRequested.type,
      onSuccess: search === 'search' ? searchCitiesLoanCountReceived.type : citiesLoanCountReceived.type,
      onError: citiesLoanCountRequestFailed.type,
    })
  );
};

export const citiesLoanCountForMarker = (userId,startDate, endDate) => (dispatch, getState) => {
  console.log("Invoking citiesLoanCount Api");
  dispatch(
    apiCallBegan({
      // url: `/api/v1/case?userId=${userId}&agencyId=${agencyId}`,
      url: "/api/v1/service",
      method: "post",
      data: {
        userId,
        feature: 'LOAN_CITIES_MARKER',
        startDate,
        endDate
      },
      onStart: citiesWiseLoanForMarkerRequested.type,
      onSuccess: citiesWiseLoanForMarkerReceived.type,
      onError: citiesWiseLoanForMarkerFailed.type,
    })
  );
};

export const agencyFinancierList = (userId) => (dispatch, getState) => {
  console.log("Invoking agencyFinancierList Api", userId);

  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'FINANCIER_AGENCY_LIST',
        userId
      },
      onStart: agencyFinancierListRequested.type,
      onSuccess: agencyFinancierListReceived.type,
      onError: agencyFinancierListRequestFailed.type,
    })
  );
};


export const filterData = (data) => (dispatch, getState) => {
  dispatch(setFilterData(data));
};

export const clearMessages = () => (dispatch) => {
  console.log("in clearMessages...");
  dispatch(clearMessagesRequested());
};

export const clearCitiwiseStorage = () => (dispatch) => {
  console.log("in clearMessages...");
  dispatch(clearCitiwiseStorages());
};

export const clearLoanStorage = () => (dispatch) => {
  console.log("in clearLoanStorage...");
  dispatch(clearLoanStorageRequested());
};
