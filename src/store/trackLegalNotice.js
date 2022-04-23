import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";

const initialState = {
    data: {
        trackLegals: []
    },
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
}

const slice = createSlice({
    name: "trackLegal",
    initialState,
    reducers: {
        trackLegalRequested: (trackLegal, action) => {
            trackLegal.loading = true;
            trackLegal.status = undefined;
            trackLegal.message = null;
            trackLegal.error = {};
        },
        trackLegalReceived: (trackLegal, action) => {
            let trackLegalData = original(trackLegal.data.trackLegals);
            let adjustedArray = [];
            console.log('trackLegal Data Initial Length:', trackLegalData.length)
            trackLegal.total = action.payload.data.total;
            trackLegal.batchRange = action.payload.data.batchRange;
            trackLegal.batchSize = action.payload.data.batchSize;
            trackLegal.limit = action.payload.data.limit;
            trackLegal.offset = action.payload.data.offset;
            trackLegal.hasMore = action.payload.data.hasMore;

            let found = false;
            let a = 0;
            for (let i = 0; i < trackLegalData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (trackLegalData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    if (trackLegalData[i].loanId == action.payload.data.loan[k].loanId) {
                        found = true;
                        console.log('trackLegalData[i]:', trackLegalData[i]);
                        console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);
                    }
                }
                if (!found) {
                    adjustedArray[a] = trackLegalData[i];
                    a++;
                }
            }
            console.log('Adjusted Array ', adjustedArray)
            console.log('API Array ', action.payload.data.loan)



            if (action.payload.data.total == 0) {
                trackLegal.data.trackLegals = [];
            }
            else {
                trackLegal.data.trackLegals = [...adjustedArray, ...action.payload.data.loan];
            }
            //trackLegal.data.trackLegals.push(action.payload.data.trackLegal);
            trackLegal.loading = false;
            trackLegal.lastFetch = Date.now();
            trackLegal.status = "success";
            trackLegal.message = null;
            trackLegal.error = {};
        },
        trackLegalRequestFailed: (trackLegal, action) => {
            trackLegal.loading = false;
            trackLegal.status = "error";
            trackLegal.message = null;
            trackLegal.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },
        searchLoanRequested: (trackLegal, action) => {
            trackLegal.loading = true;
            trackLegal.status = undefined;
            trackLegal.message = null;
            trackLegal.searchDataFound = false;
            trackLegal.searchLoanId = null;
            trackLegal.error = {};
        },
        searchLoanReceived: (trackLegal, action) => {
            let trackLegalData = original(trackLegal.data.trackLegals);
            let adjustedArray = [];

            //console.log('search data:', action.payload.data);
            //console.log('search trackLegal:', trackLegal.data.loans);
            //trackLegal.data.loans = [...trackLegal.data.loans, ...action.payload.data.loan];


            if (action.payload.data.loan.length !== 0) {
                trackLegal.data.trackLegals = [...trackLegal.data.trackLegals, ...action.payload.data.loan];
                trackLegal.searchDataFound = true;
                // trackLegal.searchLoanId = action.payload.data.loan[0].loan.loanId;
                trackLegal.searchLoanId = action.payload.data.loan[0].loanId;
            }



            let found = false;
            let a = 0;
            for (let i = 0; i < trackLegalData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (trackLegalData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    if (trackLegalData[i].loanId == action.payload.data.loan[k].loanId) {
                        found = true;
                        console.log('searchtrackLegalData[i]:', trackLegalData[i]);
                        console.log('search action.payload.data.loan[k]:', action.payload.data.loan[k]);
                    }
                }
                if (!found) {
                    adjustedArray[a] = trackLegalData[i];
                    a++;
                }
            }
            //console.log('search Adjusted Array ', adjustedArray)
            //console.log('search API Array ', action.payload.data.loan)

            trackLegal.data.trackLegals = [...adjustedArray, ...action.payload.data.loan];
            trackLegal.message = action.payload.message;
            trackLegal.loading = false;
            trackLegal.lastFetch = Date.now();
            trackLegal.status = "success";
            trackLegal.error = {};
        },
        searchLoanRequestFailed: (trackLegal, action) => {
            trackLegal.loading = false;
            trackLegal.status = "error";
            trackLegal.message = null;
            trackLegal.searchDataFound = false;
            trackLegal.searchLoanId = null;
            trackLegal.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        clearMessagesRequested: (trackLegal) => {
            trackLegal.status = undefined;
            trackLegal.message = null;
            trackLegal.error = {};
        },
        cleartrackLegalStorageRequested: () => initialState,
    },
});

const {
    trackLegalRequested,
    trackLegalReceived,
    trackLegalRequestFailed,

    searchLoanRequested,
    searchLoanReceived,
    searchLoanRequestFailed,

    clearMessagesRequested,
    cleartrackLegalStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const trackLegal = (userId, agencyId, offset, limit, startDate, endDate) => (dispatch, getState) => {
    console.log("Invoking trackLegal Api", userId, agencyId, offset, limit, startDate, endDate);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'TRACK_LEGAL_NOTICE',
                userId, agencyId, offset, limit, startDate, endDate
            },
            onStart: trackLegalRequested.type,
            onSuccess: trackLegalReceived.type,
            onError: trackLegalRequestFailed.type,
        })
    );
};

export const searchLoan = (userId, agencyId, loanId, telephone) => (
    dispatch,
    getState
) => {
    console.log(
        "Invoking searchLoan Api with",
        userId,
        agencyId,
        loanId,
        telephone
    );

    if (loanId) {
        console.log("if loan");
        dispatch(
            apiCallBegan({
                url: "/api/v1/service",
                method: "post",
                data: {
                    feature: 'SEARCH_LEGAL_LOAN',
                    userId,
                    agencyId,
                    loanId,
                },
                onStart: searchLoanRequested.type,
                onSuccess: searchLoanReceived.type,
                onError: searchLoanRequestFailed.type,
            })
        );
    } else if (telephone) {
        console.log("if telephone");
        dispatch(
            apiCallBegan({
                url: "/api/v1/service",
                method: "post",
                data: {
                    feature: 'SEARCH_LEGAL_LOAN',
                    userId,
                    agencyId,
                    telephone,
                },
                onStart: searchLoanRequested.type,
                onSuccess: searchLoanReceived.type,
                onError: searchLoanRequestFailed.type,
            })
        );
    }
};


export const clearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const cleartrackLegalStorage = () => (dispatch) => {
    console.log("in cleartrackLegalStorage...");
    dispatch(cleartrackLegalStorageRequested());
};
