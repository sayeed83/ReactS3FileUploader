import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
    data: {
        dataExportList: []
    },
    dataExportBasicData: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
}

const slice = createSlice({
  name: "dataExportList",
  initialState,
  reducers: {
    addFinancierRequested: (dataExport, action) => {
        dataExport.loading = true;
        dataExport.status = undefined;
        dataExport.message = null;
        dataExport.error = {};
    },
    addFinancierReceived: (dataExport, action) => {
        dataExport.loading = false;
        dataExport.lastFetch = Date.now();
        dataExport.status = 'success';
        dataExport.message = action.payload.message;
        dataExport.error = {};
    },
    addFinancierFailed: (dataExport, action) => {
        // console.log(" action.payload.response ", action.payload.response);
        dataExport.loading = false;
        dataExport.status = 'error';
        dataExport.message = null;
        dataExport.error = action.payload.response !== null || action.payload.response !== undefined
        ? action.payload.response
        : action.payload.message;
    },
    dataExportListRequested: (dataExportList, action) => {
        dataExportList.loading = true;
        dataExportList.status = undefined;
        dataExportList.message = null;
        dataExportList.error = {};
    },
    dataExportListReceived: (dataExportList, action) => {
        console.log(" action.payload.data ", action.payload.data.dataExport);
        dataExportList.total = action.payload.data.total;
        dataExportList.batchRange = action.payload.data.batchRange;
        dataExportList.batchSize = action.payload.data.batchSize;
        dataExportList.limit = action.payload.data.limit;
        dataExportList.offset = action.payload.data.offset;
        dataExportList.hasMore = action.payload.data.hasMore;
        dataExportList.data = action.payload.data.dataExport;

        dataExportList.loading = false;
        dataExportList.lastFetch = Date.now();
        dataExportList.status = "success";
        dataExportList.message = null;
        dataExportList.error = {};
    },
    dataExportListRequestFailed: (dataExportList, action) => {
        dataExportList.loading = false;
        dataExportList.status = "error";
        dataExportList.message = null;
        dataExportList.error =
          action.payload.response !== null || action.payload.response !== undefined
            ? action.payload.response.data
            : action.payload.message;
    },
    clearDataExportRequested: () => initialState,
  },
});

const {
    addFinancierRequested,
    addFinancierReceived,
    addFinancierFailed,
    dataExportListRequested,
    dataExportListReceived,
    dataExportListRequestFailed,
    clearDataExportRequested
} = slice.actions;
export default slice.reducer;

// Action Creators
export const exportDataList = (userId, offset, limit) => (dispatch, getState) => {
    console.log("Invoking loan Api", userId, offset, limit);
    dispatch(
      apiCallBegan({
        url: "/api/v1/service",
        method: "post",
        data: {
          feature: 'EXPORT_DATA_LIST',
          userId, offset, limit
        },
        onStart: dataExportListRequested.type,
        onSuccess: dataExportListReceived.type,
        onError: dataExportListRequestFailed.type,
      })
    );
};

export const addExportList = (data) => (dispatch, getState) => {
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data,
            onStart: addFinancierRequested.type,
            onSuccess: addFinancierReceived.type,
            onError: addFinancierFailed.type,
        })
    );
};

export const clearDataExportStorage = () => (dispatch) => {
    console.log("in clearLoanStorage...");
    dispatch(clearDataExportRequested());
};
