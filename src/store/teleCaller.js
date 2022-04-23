import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";

const initialState = {
    data: {
        teleCallers: []
    },
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
    telePhoneCallData: {
        data: null,
        loading: false,
        lastFetch: null,
        message: null,
        status: undefined,
        error: {},
    },
    getLoanDetails: {
        data: null,
        loading: false,
        lastFetch: null,
        message: null,
        status: undefined,
        error: {},
    }
}

const slice = createSlice({
    name: "teleCaller",
    initialState,
    reducers: {
        teleCallerRequested: (teleCaller, action) => {
            teleCaller.loading = true;
            teleCaller.status = undefined;
            teleCaller.message = null;
            teleCaller.error = {};
        },
        teleCallerReceived: (teleCaller, action) => {
            let teleCallerData = original(teleCaller.data.teleCallers);
            let adjustedArray = [];
            console.log('teleCaller Data Initial Length:', teleCallerData)
            teleCaller.total = action.payload.data.total;
            teleCaller.batchRange = action.payload.data.batchRange;
            teleCaller.batchSize = action.payload.data.batchSize;
            teleCaller.limit = action.payload.data.limit;
            teleCaller.offset = action.payload.data.offset;
            teleCaller.hasMore = action.payload.data.hasMore;

            // let found = false;
            // let a = 0;
            // for (let i = 0; i < teleCallerData.length; i++) {
            //     for (let k = 0; k < action.payload.data.loan.length; k++) {
            //         if (teleCallerData[i].clientId == action.payload.data.loan[k].clientId) {
            //             found = true;
            //         }
            //         if (teleCallerData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
            //             found = true;
            //             //console.log('teleCallerData[i]:', teleCallerData[i]);
            //             //console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);

            //         }
            //     }
            //     if (!found) {
            //         adjustedArray[a] = teleCallerData[i];
            //         a++;
            //     }
            // }
            console.log('Adjusted Array ', adjustedArray)
            console.log('API Array ', action.payload.data.loan)

            teleCaller.data.teleCallers = action.payload.data.loan;
            // teleCaller.data.teleCallers = [...teleCallerData, ...action.payload.data.loan];
            teleCaller.loading = false;
            teleCaller.lastFetch = Date.now();
            teleCaller.status = "success";
            teleCaller.message = null;
            teleCaller.error = {};
        },
        teleCallerRequestFailed: (teleCaller, action) => {
            teleCaller.loading = false;
            teleCaller.status = "error";
            teleCaller.message = null;
            teleCaller.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },
        searchLoanRequested: (teleCaller, action) => {
            teleCaller.loading = true;
            teleCaller.status = undefined;
            teleCaller.message = null;
            teleCaller.searchDataFound = false;
            teleCaller.searchLoanId = null;
            teleCaller.error = {};
        },
        searchLoanReceived: (teleCaller, action) => {
            let teleCallerData = original(teleCaller.data.teleCallers);
            let adjustedArray = [];
            //console.log('search data:', action.payload.data);
            //console.log('search teleCaller:', teleCaller.data.loans);
            //teleCaller.data.loans = [...teleCaller.data.loans, ...action.payload.data.loan];

            if (action.payload.data.loan.length !== 0) {
                teleCaller.data.teleCallers = [...teleCaller.data.teleCallers, ...action.payload.data.loan];
                teleCaller.searchDataFound = true;
                teleCaller.searchLoanId = action.payload.data.loan[0].loan.loanId;
            }

            let found = false;
            let a = 0;
            for (let i = 0; i < teleCallerData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (teleCallerData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    if (teleCallerData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
                        found = true;
                        //console.log('teleCallerData[i]:', teleCallerData[i]);
                        //console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);

                    }
                }
                if (!found) {
                    adjustedArray[a] = teleCallerData[i];
                    a++;
                }
            }
            //console.log('Adjusted Array ', adjustedArray)
            //console.log('API Array ', action.payload.data.loan)

            teleCaller.data.teleCallers = action.payload.data.loan;
            // teleCaller.data.teleCallers = [...action.payload.data.loan, ...adjustedArray];
            teleCaller.message = action.payload.message;
            teleCaller.loading = false;
            teleCaller.lastFetch = Date.now();
            teleCaller.status = "success";
            teleCaller.error = {};
        },
        searchLoanRequestFailed: (teleCaller, action) => {
            teleCaller.loading = false;
            teleCaller.status = "error";
            teleCaller.message = null;
            teleCaller.searchDataFound = false;
            teleCaller.searchLoanId = null;
            teleCaller.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        getLoanDetailsRequested: (teleCaller, action) => {
            teleCaller.getLoanDetails.loading = true;
            teleCaller.getLoanDetails.status = undefined;
            teleCaller.getLoanDetails.message = null;
            teleCaller.getLoanDetails.searchDataFound = false;
            teleCaller.getLoanDetails.searchLoanId = null;
            teleCaller.getLoanDetails.error = {};
        },
        getLoanDetailsReceived: (teleCaller, action) => {
            teleCaller.getLoanDetails.data = action.payload.data;
            teleCaller.getLoanDetails.message = action.payload.message;
            teleCaller.getLoanDetails.loading = false;
            teleCaller.getLoanDetails.lastFetch = Date.now();
            teleCaller.getLoanDetails.status = "success";
            teleCaller.getLoanDetails.error = {};
        },
        getLoanDetailsRequestFailed: (teleCaller, action) => {
            teleCaller.getLoanDetails.loading = false;
            teleCaller.getLoanDetails.status = "error";
            teleCaller.getLoanDetails.message = null;
            teleCaller.getLoanDetails.searchDataFound = false;
            teleCaller.getLoanDetails.searchLoanId = null;
            teleCaller.getLoanDetails.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        addDispositionRequested: (teleCaller, action) => {
            teleCaller.loading = true;
            teleCaller.status = undefined;
            teleCaller.message = null;
            teleCaller.error = {};
        },
        addDispositionReceived: (teleCaller, action) => {
            let teleCallerLoanData = original(teleCaller.data.teleCallers);
            //console.log('action.payload:', action.payload);
            teleCallerLoanData.filter((item, index) => {
                if (item.clientId == action.payload.data[0].clientId) {
                    //console.log('action.payload.data[0]:', action.payload.data[0]);
                    teleCaller.data.teleCallers.splice(index, 1, action.payload.data[0]);
                }
                return teleCallerLoanData;
            });

            //console.log('teleCallerLoanData:', teleCallerLoanData)

            teleCaller.message = action.payload.message;
            teleCaller.loading = false;
            teleCaller.lastFetch = Date.now();
            teleCaller.status = "success";
            teleCaller.error = {};
        },
        addDispositionRequestFailed: (teleCaller, action) => {
            teleCaller.loading = false;
            teleCaller.status = "error";
            teleCaller.message = null;
            teleCaller.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        telePhoneCallRequested: (teleCaller, action) => {
            teleCaller.telePhoneCallData.loading = true;
            teleCaller.telePhoneCallData.status = undefined;
            teleCaller.telePhoneCallData.message = null;
            teleCaller.telePhoneCallData.error = {};
        },
        telePhoneCallReceived: (teleCaller, action) => {
            teleCaller.telePhoneCallData.data = action.payload.data;
            teleCaller.telePhoneCallData.message = action.payload.message;
            teleCaller.telePhoneCallData.loading = false;
            teleCaller.telePhoneCallData.lastFetch = Date.now();
            teleCaller.telePhoneCallData.status = "success";
            teleCaller.telePhoneCallData.error = {};
        },
        telePhoneCallRequestFailed: (teleCaller, action) => {
            teleCaller.telePhoneCallData.loading = false;
            teleCaller.telePhoneCallData.status = "error";
            teleCaller.telePhoneCallData.message = action.payload.message ? action.payload.message : '';
            teleCaller.telePhoneCallData.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        clearMessagesTelephoneRequested: (teleCaller) => {
            teleCaller.telePhoneCallData.status = undefined;
            teleCaller.telePhoneCallData.message = null;
            teleCaller.telePhoneCallData.searchDataFound = false;
            teleCaller.telePhoneCallData.searchLoanId = null;
            teleCaller.telePhoneCallData.error = {};
        },

        clearMessagesGetLoanDetailsRequested: (teleCaller) => {
            teleCaller.getLoanDetails.status = undefined;
            teleCaller.getLoanDetails.message = null;
            teleCaller.getLoanDetails.error = {};
        },

        clearMessagesRequested: (teleCaller) => {
            teleCaller.status = undefined;
            teleCaller.message = null;
            teleCaller.error = {};
        },
        clearTeleCallerStorageRequested: () => initialState,
    },
});

const {
    teleCallerRequested,
    teleCallerReceived,
    teleCallerRequestFailed,

    searchLoanRequested,
    searchLoanReceived,
    searchLoanRequestFailed,

    getLoanDetailsRequested,
    getLoanDetailsReceived,
    getLoanDetailsRequestFailed,

    addDispositionRequested,
    addDispositionReceived,
    addDispositionRequestFailed,

    telePhoneCallRequested,
    telePhoneCallReceived,
    telePhoneCallRequestFailed,

    clearMessagesTelephoneRequested,
    clearMessagesGetLoanDetailsRequested,
    clearMessagesRequested,
    clearTeleCallerStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const teleCaller = (userId, agencyId, offset, limit) => (dispatch, getState) => {
    console.log("Invoking teleCaller Api", userId, agencyId, offset, limit);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'TELECALLING_LOAN_LIST',
                userId, agencyId, offset, limit
            },
            onStart: teleCallerRequested.type,
            onSuccess: teleCallerReceived.type,
            onError: teleCallerRequestFailed.type,
        })
    );
};

export const searchLoan = (userId, agencyId, loanId, telephone, financierId) => (
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
                    feature: 'SEARCH_LOAN',
                    userId,
                    agencyId,
                    loanId,
                    financierId,
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
                    financierId,
                },
                onStart: searchLoanRequested.type,
                onSuccess: searchLoanReceived.type,
                onError: searchLoanRequestFailed.type,
            })
        );
    }
};

export const getLoanDetails = (userId, agencyId, loanId, financierId) => (
    dispatch,
    getState
) => {
    console.log(
        "Invoking getLoanDetails Api with",
        userId,
        agencyId,
        loanId
    );

    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'SEARCH_LOAN',
                userId,
                agencyId,
                loanId,
                financierId,
            },
            onStart: getLoanDetailsRequested.type,
            onSuccess: getLoanDetailsReceived.type,
            onError: getLoanDetailsRequestFailed.type,
        })
    );
};

export const addDisposition = (
    userId,
    agencyId,
    loanId,
    dispositionCode,
    dispositionDate,
    comment,
    attachment1
) => (dispatch, getState) => {
    console.log(
        "Invoking Disposition Api with",
        userId,
        agencyId,
        loanId,
        dispositionCode,
        dispositionDate,
        comment,
        //attachment1
    );
    const state = getState();
    // const { latitude, longitude } = state.entities.user;
    let latitude = 12, longitude = 45;
    //console.log(latitude, longitude);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            headers: { latitude, longitude },
            data: {
                feature: 'ADD_DISPOSITION',
                userId,
                agencyId,
                loanId,
                dispositionCode,
                dispositionDate,
                comment,
                attachment1
            },
            onStart: addDispositionRequested.type,
            onSuccess: addDispositionReceived.type,
            onError: addDispositionRequestFailed.type,
        })
    );
};

export const telePhoneCall = (userId, telephoneNo, dialNo, loanId, financierId, agencyId) => (dispatch, getState) => {
    console.log("Invoking CalltelePhoneCall Api ", userId, telephoneNo, dialNo, loanId, financierId, agencyId);
    telephoneNo = '9022026964';
    // dialNo = '1212345621';
    dialNo = '8451043905';
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'TELEPHONY_MAKE_CALL',
                userId, telephoneNo, dialNo, loanId, financierId, agencyId
            },
            onStart: telePhoneCallRequested.type,
            onSuccess: telePhoneCallReceived.type,
            onError: telePhoneCallRequestFailed.type,
        })
    );
};

export const telePhoneClearMessages = () => (dispatch) => {
    console.log("in telePhoneClearMessages...");
    dispatch(clearMessagesTelephoneRequested());
};

export const getLoanDetailsClearMessages = () => (dispatch) => {
    console.log("in getLoanDetailsClearMessages...");
    dispatch(clearMessagesGetLoanDetailsRequested());
};



export const clearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const clearTeleCallerStorage = () => (dispatch) => {
    console.log("in clearTeleCallerStorage...");
    dispatch(clearTeleCallerStorageRequested());
};