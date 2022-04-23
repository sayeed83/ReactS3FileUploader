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
    name: "checkEmail",
    initialState,
    reducers: {
        checkEmailRequested: (checkEmail, action) => {
            checkEmail.loading = true;
            checkEmail.status = undefined;
            checkEmail.message = null;
            checkEmail.error = {};
        },
        checkEmailReceived: (checkEmail, action) => {
            checkEmail.data = action.payload.data;
            checkEmail.loading = false;
            checkEmail.lastFetch = Date.now();
            checkEmail.message = null;
            checkEmail.status = "success";
            checkEmail.error = {};
        },
        checkEmailRequestFailed: (checkEmail, action) => {
            checkEmail.loading = false;
            checkEmail.message = null;
            checkEmail.status = "error";
            checkEmail.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        clearMessagesRequested: (checkEmail) => {
            checkEmail.error = {};
            checkEmail.status = undefined;
            checkEmail.message = null;
            checkEmail.loading = false;
        },
        emailClearStorageRequested: () => initialState,
    },
});

const {
    checkEmailRequested,
    checkEmailReceived,
    checkEmailRequestFailed,

    clearMessagesRequested,
    emailClearStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators


export const checkEmail = (email, emailEntityType, userId) => (dispatch, getState) => {
    console.log(
        "Invoking checkEmail Api with",
        email, emailEntityType, userId
    );
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'CHECK_EMAIL_EXIST',
                email,
                emailEntityType,
                userId
            },
            onStart: checkEmailRequested.type,
            onSuccess: checkEmailReceived.type,
            onError: checkEmailRequestFailed.type,
        })
    );
};


export const checkEmailClearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const emailClearStorage = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(emailClearStorageRequested());
};
