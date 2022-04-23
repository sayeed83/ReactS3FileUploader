import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";

const initialState = {
    data: {
        legals: []
    },
    sendEmailData: {
        loading: false,
        lastFetch: null,
        message: null,
        status: undefined,
        error: {},
    },
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
}

const slice = createSlice({
    name: "legal",
    initialState,
    reducers: {
        legalRequested: (legal, action) => {
            legal.loading = true;
            legal.status = undefined;
            legal.message = null;
            legal.error = {};
        },
        legalReceived: (legal, action) => {
            console.log(" legal data from api ========= ", legal.data)
            console.log(" action from api ========= ", action.payload.data)
            let legalData = original(legal.data.legals);
            let adjustedArray = [];
            console.log('legal Data Initial Length:', legalData.length)
            legal.total = action.payload.data.total;
            legal.batchRange = action.payload.data.batchRange;
            legal.batchSize = action.payload.data.batchSize;
            legal.limit = action.payload.data.limit;
            legal.offset = action.payload.data.offset;
            legal.hasMore = action.payload.data.hasMore;

            let found = false;
            let a = 0;
            for (let i = 0; i < legalData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (legalData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    // if (legalData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
                    //     found = true;
                    //     console.log('legalData[i]:', legalData[i]);
                    //     console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);

                    // }
                }
                if (!found) {
                    adjustedArray[a] = legalData[i];
                    a++;
                }
            }
            console.log('Adjusted Array ', adjustedArray)
            console.log('API Array ', action.payload.data.loan)

            // if (action.payload.data.total == 0) {
            //     legal.data.legals = [];
            // }
            // else {
            //     legal.data.legals = [...adjustedArray, ...action.payload.data.loan];
            // }
            if(action.payload.data.total > 0) {
                legal.data.legals = [...adjustedArray, ...action.payload.data.loan];
            }
            legal.loading = false;
            legal.lastFetch = Date.now();
            legal.status = "success";
            legal.message = null;
            legal.error = {};
        },
        legalRequestFailed: (legal, action) => {
            legal.loading = false;
            legal.status = "error";
            legal.message = null;
            legal.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },
        searchLoanRequested: (legal, action) => {
            legal.loading = true;
            legal.status = undefined;
            legal.message = null;
            legal.searchDataFound = false;
            legal.searchLoanId = null;
            legal.error = {};
        },
        searchLoanReceived: (legal, action) => {

            let legalData = original(legal.data.legals);
            let adjustedArray = [];

            if (action.payload.data.loan.length !== 0) {
                legal.data.legals = [...legal.data.legals, ...action.payload.data.loan];
                legal.searchDataFound = true;
                legal.searchLoanId = action.payload.data.loan[0].loan.loanId;
            }

            let found = false;
            let a = 0;
            for (let i = 0; i < legalData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (legalData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    if (legalData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
                        found = true;
                        //console.log('legalData[i]:', legalData[i]);
                        //console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);

                    }
                }
                if (!found) {
                    adjustedArray[a] = legalData[i];
                    a++;
                }
            }
            //console.log('Adjusted Array ', adjustedArray)
            //console.log('API Array ', action.payload.data.loan)

            legal.data.legals = [...adjustedArray, ...action.payload.data.loan];
            legal.message = action.payload.message;
            legal.loading = false;
            legal.lastFetch = Date.now();
            legal.status = "success";
            legal.error = {};
        },
        searchLoanRequestFailed: (legal, action) => {
            legal.loading = false;
            legal.status = "error";
            legal.message = null;
            legal.searchDataFound = false;
            legal.searchLoanId = null;
            legal.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        sendEmailRequested: (legal, action) => {
            legal.sendEmailData.loading = true;
            legal.sendEmailData.status = undefined;
            legal.sendEmailData.message = null;
            legal.sendEmailData.error = {};
        },
        sendEmailReceived: (legal, action) => {
            legal.sendEmailData.loading = false;
            legal.sendEmailData.lastFetch = Date.now();
            legal.sendEmailData.status = "success";
            legal.sendEmailData.message = action.payload.message;
            legal.sendEmailData.error = {};
        },
        sendEmailRequestFailed: (legal, action) => {
            legal.sendEmailData.loading = false;
            legal.sendEmailData.status = "error";
            legal.sendEmailData.message = null;
            legal.sendEmailData.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },
        clearMessagesRequested: (legal) => {
            legal.status = undefined;
            legal.message = null;
            legal.error = {};

            legal.sendEmailData.status = undefined;
            legal.sendEmailData.message = null;
            legal.sendEmailData.error = {};
        },
        clearLegalStorageRequested: () => initialState,
    },
});

const {
    legalRequested,
    legalReceived,
    legalRequestFailed,

    searchLoanRequested,
    searchLoanReceived,
    searchLoanRequestFailed,

    sendEmailRequested,
    sendEmailReceived,
    sendEmailRequestFailed,


    clearMessagesRequested,
    clearLegalStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const legal = (userId, agencyId, offset, limit, startDate, endDate) => (dispatch, getState) => {
    console.log("Invoking legal Api", userId, agencyId, offset, limit, startDate, endDate);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'GENERATE_LEGAL_NOTICE',
                userId, agencyId, offset, limit, startDate, endDate
            },
            onStart: legalRequested.type,
            onSuccess: legalReceived.type,
            onError: legalRequestFailed.type,
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
                    feature: 'SEARCH_LOAN',
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

export const sendEmail = (userId, batchNumber, forSms, forEmail, token, operatingSystem) => (dispatch, getState) => {
    console.log("Invoking sendEmail Api", userId, batchNumber, forSms, forEmail, token, operatingSystem);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'ADD_LEGAL_NOTICE',
                userId, batchNumber, forSms, forEmail, token, operatingSystem
            },
            onStart: sendEmailRequested.type,
            onSuccess: sendEmailReceived.type,
            onError: sendEmailRequestFailed.type,
        })
    );
};

export const clearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const clearLegalStorage = () => (dispatch) => {
    console.log("in clearLegalStorage...");
    dispatch(clearLegalStorageRequested());
};
