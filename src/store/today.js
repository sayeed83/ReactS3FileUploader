import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";

const initialState = {
    data: {
        todays: []
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
    }
}

const slice = createSlice({
    name: "today",
    initialState,
    reducers: {
        todayRequested: (today, action) => {
            today.loading = true;
            today.status = undefined;
            today.message = null;
            today.error = {};
        },
        todayReceived: (today, action) => {
            let todayData = original(today.data.todays);
            let adjustedArray = [];
            console.log('today Data Initial Length:', todayData.length)
            today.total = action.payload.data.total;
            today.batchRange = action.payload.data.batchRange;
            today.batchSize = action.payload.data.batchSize;
            today.limit = action.payload.data.limit;
            today.offset = action.payload.data.offset;
            today.hasMore = action.payload.data.hasMore;

            let found = false;
            let a = 0;
            for (let i = 0; i < todayData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (todayData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    if (todayData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
                        found = true;
                        console.log('todayData[i]:', todayData[i]);
                        console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);

                    }
                }
                if (!found) {
                    adjustedArray[a] = todayData[i];
                    a++;
                }
            }
            console.log('Adjusted Array ', adjustedArray)
            console.log('API Array ', action.payload.data.loan)

            today.data.todays = [...adjustedArray, ...action.payload.data.loan];
            //today.data.todays.push(action.payload.data.today);
            today.loading = false;
            today.lastFetch = Date.now();
            today.status = "success";
            today.message = null;
            today.error = {};
        },
        todayRequestFailed: (today, action) => {
            today.loading = false;
            today.status = "error";
            today.message = null;
            today.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },
        searchLoanRequested: (today, action) => {
            today.loading = true;
            today.status = undefined;
            today.message = null;
            today.searchDataFound = false;
            today.searchLoanId = null;
            today.error = {};
        },
        searchLoanReceived: (today, action) => {
            let todayData = original(today.data.todays);
            let adjustedArray = [];
            //console.log('search data:', action.payload.data);
            //console.log('search today:', today.data.loans);
            //today.data.loans = [...today.data.loans, ...action.payload.data.loan];

            if (action.payload.data.loan.length !== 0) {
                today.data.todays = [...today.data.todays, ...action.payload.data.loan];
                today.searchDataFound = true;
                today.searchLoanId = action.payload.data.loan[0].loan.loanId;
            }

            let found = false;
            let a = 0;
            for (let i = 0; i < todayData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (todayData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    if (todayData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
                        found = true;
                        //console.log('todayData[i]:', todayData[i]);
                        //console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);

                    }
                }
                if (!found) {
                    adjustedArray[a] = todayData[i];
                    a++;
                }
            }
            //console.log('Adjusted Array ', adjustedArray)
            //console.log('API Array ', action.payload.data.loan)

            today.data.todays = [...action.payload.data.loan, ...adjustedArray];
            today.message = action.payload.message;
            today.loading = false;
            today.lastFetch = Date.now();
            today.status = "success";
            today.error = {};
        },
        searchLoanRequestFailed: (today, action) => {
            today.loading = false;
            today.status = "error";
            today.message = null;
            today.searchDataFound = false;
            today.searchLoanId = null;
            today.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        addDispositionRequested: (today, action) => {
            today.loading = true;
            today.status = undefined;
            today.message = null;
            today.error = {};
        },
        addDispositionReceived: (today, action) => {
            let todayLoanData = original(today.data.todays);
            //console.log('action.payload:', action.payload);
            todayLoanData.filter((item, index) => {
                if (item.clientId == action.payload.data[0].clientId) {
                    //console.log('action.payload.data[0]:', action.payload.data[0]);
                    today.data.todays.splice(index, 1, action.payload.data[0]);
                }
                return todayLoanData;
            });

            //console.log('todayLoanData:', todayLoanData)

            today.message = action.payload.message;
            today.loading = false;
            today.lastFetch = Date.now();
            today.status = "success";
            today.error = {};
        },
        addDispositionRequestFailed: (today, action) => {
            today.loading = false;
            today.status = "error";
            today.message = null;
            today.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        telePhoneCallRequested: (today, action) => {
            today.telePhoneCallData.loading = true;
            today.telePhoneCallData.status = undefined;
            today.telePhoneCallData.message = null;
            today.telePhoneCallData.error = {};
        },
        telePhoneCallReceived: (today, action) => {
            today.telePhoneCallData.data = action.payload.data;
            today.telePhoneCallData.message = action.payload.message;
            today.telePhoneCallData.loading = false;
            today.telePhoneCallData.lastFetch = Date.now();
            today.telePhoneCallData.status = "success";
            today.telePhoneCallData.error = {};
        },
        telePhoneCallRequestFailed: (today, action) => {
            today.telePhoneCallData.loading = false;
            today.telePhoneCallData.status = "error";
            today.telePhoneCallData.message = action.payload.message ? action.payload.message : '';
            today.telePhoneCallData.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        clearMessagesTelephoneRequested: (today) => {
            today.telePhoneCallData.status = undefined;
            today.telePhoneCallData.message = null;
            today.telePhoneCallData.searchDataFound = false;
            today.telePhoneCallData.searchLoanId = null;
            today.telePhoneCallData.error = {};
        },

        clearMessagesRequested: (today) => {
            today.status = undefined;
            today.message = null;
            today.error = {};
        },
        clearTodayStorageRequested: () => initialState,
    },
});

const {
    todayRequested,
    todayReceived,
    todayRequestFailed,

    searchLoanRequested,
    searchLoanReceived,
    searchLoanRequestFailed,

    addDispositionRequested,
    addDispositionReceived,
    addDispositionRequestFailed,

    telePhoneCallRequested,
    telePhoneCallReceived,
    telePhoneCallRequestFailed,

    clearMessagesTelephoneRequested,
    clearMessagesRequested,
    clearTodayStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const today = (userId, agencyId, offset, limit, financierId) => (dispatch, getState) => {
    console.log("Invoking today Api", userId, agencyId, offset, limit, financierId);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'TODAYS_ACTIONED_LOANS',
                userId, agencyId, offset, limit, financierId
            },
            onStart: todayRequested.type,
            onSuccess: todayReceived.type,
            onError: todayRequestFailed.type,
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

export const addDisposition = (
    userId,
    agencyId,
    loanId,
    dispositionCode,
    dispositionDate,
    comment,
    amount,
    paymentMode,
    attachment1,
    techInfoAgentLoginId,
    techInfoAgentTerminalId
) => (dispatch, getState) => {
    console.log(
        "Invoking Disposition Api with",
        "userId",userId,
        "agencyId",agencyId,
        "loanId",loanId,
        "dispositionCode",dispositionCode,
        "dispositionDate",dispositionDate,
        "comment",comment,
        "amount",amount,
        "paymentMode",paymentMode,
        //attachment1,
        "techInfoAgentLoginId",techInfoAgentLoginId,
        "techInfoAgentLoginId", techInfoAgentLoginId
    );
    // return;
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
                amount,
                paymentMode,
                attachment1,
                techInfoAgentLoginId,
                techInfoAgentTerminalId
            },
            onStart: addDispositionRequested.type,
            onSuccess: addDispositionReceived.type,
            onError: addDispositionRequestFailed.type,
        })
    );
};

export const telePhoneCall = (userId, telephoneNo, dialNo, loanId,financierId,agencyId) => (dispatch, getState) => {
    console.log("Invoking CalltelePhoneCall Api", userId, telephoneNo, dialNo, loanId,financierId,agencyId);

    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'TELEPHONY_MAKE_CALL',
                userId, telephoneNo, dialNo, loanId,financierId,agencyId
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

export const clearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const clearTodayStorage = () => (dispatch) => {
    console.log("in clearTodayStorage...");
    dispatch(clearTodayStorageRequested());
};