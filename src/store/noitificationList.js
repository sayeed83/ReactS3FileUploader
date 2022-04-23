import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";

const initialState = {
    data: {
        notificationLists: []
    },
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
}

const slice = createSlice({
    name: "notificationList",
    initialState,
    reducers: {
        notificationListRequested: (notificationList, action) => {
            notificationList.loading = true;
            notificationList.status = undefined;
            notificationList.message = null;
            notificationList.error = {};
        },
        notificationListReceived: (notificationList, action) => {
            console.log(" notificationListReceived ", notificationList);
            let notificationListData = original(notificationList.data.notificationLists);
            let adjustedArray = [];
            console.log('notificationList Data Initial Length:', notificationListData.length)
            notificationList.total = action.payload.data.total;
            notificationList.batchRange = action.payload.data.batchRange;
            notificationList.batchSize = action.payload.data.batchSize;
            notificationList.limit = action.payload.data.limit;
            notificationList.offset = action.payload.data.offset;
            notificationList.hasMore = action.payload.data.hasMore;

            let found = false;
            let a = 0;
            // for (let i = 0; i < notificationListData.length; i++) {
            //     for (let k = 0; k < action.payload.data.loan.length; k++) {
            //         if (notificationListData[i].clientId == action.payload.data.loan[k].clientId) {
            //             found = true;
            //         }
            //         if (notificationListData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
            //             found = true;
            //             console.log('notificationListData[i]:', notificationListData[i]);
            //             console.log('action.payload.data.loan[k]:', action.payload.data.loan[k]);
            //         }
            //     }
            //     if (!found) {
            //         adjustedArray[a] = notificationListData[i];
            //         a++;
            //     }
            // }
            console.log('Adjusted Array ', adjustedArray)
            console.log('API Array ', action.payload.data.loan)



            if (action.payload.data.total == 0) {
                notificationList.data.notificationLists = [];
            }
            else {
                notificationList.data.notificationLists = [...adjustedArray, ...action.payload.data.notificationList];
            }
            //notificationList.data.notificationLists.push(action.payload.data.notificationList);
            notificationList.loading = false;
            notificationList.lastFetch = Date.now();
            notificationList.status = "success";
            notificationList.message = null;
            notificationList.error = {};
        },
        notificationListRequestFailed: (notificationList, action) => {
            notificationList.loading = false;
            notificationList.status = "error";
            notificationList.message = null;
            notificationList.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },
        removeNotificationRequested: (notificationList, action) => {
            notificationList.loading = true;
            notificationList.status = undefined;
            notificationList.message = null;
            notificationList.searchDataFound = false;
            notificationList.removeNotificationId = null;
            notificationList.error = {};
        },
        removeNotificationReceived: (notificationList, action) => {
            let notificationListData = original(notificationList.data.notificationLists);
            let adjustedArray = [];

            //console.log('search data:', action.payload.data);
            //console.log('search notificationList:', notificationList.data.loans);
            //notificationList.data.loans = [...notificationList.data.loans, ...action.payload.data.loan];


            if (action.payload.data.loan.length !== 0) {
                notificationList.data.notificationLists = [...notificationList.data.notificationLists, ...action.payload.data.loan];
                notificationList.searchDataFound = true;
                notificationList.removeNotificationId = action.payload.data.loan[0].loan.loanId;
            }



            let found = false;
            let a = 0;
            for (let i = 0; i < notificationListData.length; i++) {
                for (let k = 0; k < action.payload.data.loan.length; k++) {
                    if (notificationListData[i].clientId == action.payload.data.loan[k].clientId) {
                        found = true;
                    }
                    if (notificationListData[i].loan.loanId == action.payload.data.loan[k].loan.loanId) {
                        found = true;
                        console.log('searchnotificationListData[i]:', notificationListData[i]);
                        console.log('search action.payload.data.loan[k]:', action.payload.data.loan[k]);
                    }
                }
                if (!found) {
                    adjustedArray[a] = notificationListData[i];
                    a++;
                }
            }
            //console.log('search Adjusted Array ', adjustedArray)
            //console.log('search API Array ', action.payload.data.loan)

            notificationList.data.notificationLists = [...adjustedArray, ...action.payload.data.loan];
            notificationList.message = action.payload.message;
            notificationList.loading = false;
            notificationList.lastFetch = Date.now();
            notificationList.status = "success";
            notificationList.error = {};
        },
        removeNotificationRequestFailed: (notificationList, action) => {
            notificationList.loading = false;
            notificationList.status = "error";
            notificationList.message = null;
            notificationList.searchDataFound = false;
            notificationList.removeNotificationId = null;
            notificationList.error =
                action.payload.response != null || action.payload.response != undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        clearMessagesRequested: (notificationList) => {
            notificationList.status = undefined;
            notificationList.message = null;
            notificationList.error = {};
        },
        clearnotificationListStorageRequested: () => initialState,
    },
});

const {
    notificationListRequested,
    notificationListReceived,
    notificationListRequestFailed,

    removeNotificationRequested,
    removeNotificationReceived,
    removeNotificationRequestFailed,

    clearMessagesRequested,
    clearnotificationListStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const notificationList = (userId, agencyId, offset, limit, startDate, endDate) => (dispatch, getState) => {
    console.log("Invoking notificationList Api", userId, agencyId, offset, limit, startDate, endDate);
    
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'NOTIFICATION_LIST',
                userId, agencyId, offset, limit, startDate, endDate
            },
            onStart: notificationListRequested.type,
            onSuccess: notificationListReceived.type,
            onError: notificationListRequestFailed.type,
        })
    );
};

export const removeNotification = (userId, batchNumber) => (dispatch,getState) => {
    console.log(
        "Invoking removeNotification Api with",
        userId,
        batchNumber
    );
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'UPDATE_NOTIFICATION',
                operation: 'UPDATE_NOTIFICATION',
                userId,
                batchNumber
            },
            onStart: removeNotificationRequested.type,
            onSuccess: removeNotificationReceived.type,
            onError: removeNotificationRequestFailed.type,
        })
    );
};

export const clearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const clearnotificationListStorage = () => (dispatch) => {
    console.log("in clearnotificationListStorage...");
    dispatch(clearnotificationListStorageRequested());
};
