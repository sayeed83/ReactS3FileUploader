import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
    data: null,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
}

const slice = createSlice({
    name: "userList",
    initialState,
    reducers: {
        userListRequested: (userList, action) => {
            userList.loading = true;
            userList.message = null;
            userList.status = undefined;
            userList.error = {};
        },
        userListReceived: (userList, action) => {
            userList.data = action.payload.data;
            userList.loading = false;
            userList.lastFetch = Date.now();
            userList.message = null;
            userList.status = "success";
            userList.error = {};
        },
        userListRequestFailed: (userList, action) => {
            userList.loading = false;
            userList.message = null;
            userList.status = undefined;
            userList.error =
                action.payload.response !== null ||
                    action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message
        },
        clearMessagesRequested: (userList) => {
            userList.status = undefined;
            userList.message = null;
            userList.error = {};
        },
        clearUserListStorageRequested: () => initialState,
    },
});

const {
    userListRequested,
    userListReceived,
    userListRequestFailed,
    clearMessagesRequested,
    clearUserListStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators

export const getUserList = (userId) => (dispatch, getState) => {
    console.log("Invoking userList Api", userId);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'USER_LIST',
                userId
            },
            onStart: userListRequested.type,
            onSuccess: userListReceived.type,
            onError: userListRequestFailed.type,
        })
    );
};

export const clearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const clearUserListStorage = () => (dispatch) => {
    console.log("in clearUserListStorageRequested...");
    dispatch(clearUserListStorageRequested());
};
