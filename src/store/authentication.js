import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
// import { techdialer } from "../utils/constant";
const axios = require('axios')

const slice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    loggedIn: false,
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
    showLogs:true,
	terminalId:null,
  },
  reducers: {
    loginRequested: (auth, action) => {
      auth.loading = true;
      auth.status = undefined;
      auth.message = null;
      auth.data = {};
      auth.error = {};
    },
    loginReceived: (auth, action) => {
      console.log(" action.payload.data ", action.payload);
      // return;
      auth.data = action.payload.data;
      auth.loggedIn = true;
      auth.loading = false;
      auth.lastFetch = Date.now();
      auth.message = null;
      auth.status = "success";
      auth.error = {};
    },
    loginRequestFailed: (auth, action) => {
      auth.loading = false;
      auth.loggedIn = false;
      auth.status = "error";
      auth.message = null;
      auth.error =
        action.payload.response != null || action.payload.response != undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    forgotPasswordRequested: (auth, action) => {
      auth.loading = true;
      auth.message = null;
      auth.status = undefined;
      auth.error = {};
    },
    forgotPasswordReceived: (auth, action) => {
      auth.data = {};
      auth.message = action.payload.message;
      auth.loading = false;
      auth.lastFetch = null;
      auth.status = "success";
      auth.error = {};
    },
    forgotPasswordRequestFailed: (auth, action) => {
      auth.loading = false;
      auth.status = "error";
      auth.message = null;
      auth.error =
        action.payload.response != null || action.payload.response != undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    changePasswordRequested: (auth, action) => {
      auth.loading = true;
      auth.message = null;
      auth.status = undefined;
      auth.error = {};
    },
    changePasswordReceived: (auth, action) => {
      //auth.data = {};
      auth.message = action.payload.message;
      auth.loading = false;
      // auth.loggedIn = false;
      auth.lastFetch = null;
      auth.status = "success";
      auth.error = {};
    },
    changePasswordRequestFailed: (auth, action) => {
      auth.loading = false;
      auth.status = "error";
      auth.message = null;
      auth.error =
        action.payload.response != null || action.payload.response != undefined
          ? action.payload.response.data
          : action.payload.message;
    },
    setLogs: (auth, action) => {
      auth.showLogs = action.payload;
    },
    logoutRequested: (auth) => {
      auth.data = {};
      auth.loggedIn = false;
      auth.loading = false;
      auth.lastFetch = null;
      auth.message = null;
      auth.status = undefined;
      auth.error = {};
      auth.showLogs=true;
	  auth.terminalId=null;
    },
    clearMessagesRequested: (auth) => {
      auth.status = undefined;
      auth.message = null;
      auth.error = {};
    },
	updateTerminalIdRequest: (auth, action) => {
		auth.terminalId = action.payload;
	}
  },
});

const {
  loginRequested,
  loginReceived,
  loginRequestFailed,
  forgotPasswordRequested,
  forgotPasswordReceived,
  forgotPasswordRequestFailed,
  changePasswordRequested,
  changePasswordReceived,
  changePasswordRequestFailed,
  setLogs,
  logoutRequested,
  clearMessagesRequested,
  updateTerminalIdRequest
} = slice.actions;
export default slice.reducer;

// Action Creators

export const login = (email, password) => (dispatch, getState) => {
  console.log("Invoking Login Api with", email, password);

  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: { feature: 'LOGIN', email, password },
      onStart: loginRequested.type,
      onSuccess: loginReceived.type,
      onError: loginRequestFailed.type,
    })
  );
};

export const forgotPassword = (email) => (dispatch, getState) => {
  console.log("Invoking forgotPassword Api with", email);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: { feature: 'FORGOT_PASSWORD', email },// need to change 
      onStart: forgotPasswordRequested.type,
      onSuccess: forgotPasswordReceived.type,
      onError: forgotPasswordRequestFailed.type,
    })
  );
};

export const changePassword = (userId, password) => (dispatch, getState) => {
  console.log("Invoking changePassword Api with", userId, password);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: { feature: 'UPDATE_PASSWORD', userId, password },
      onStart: changePasswordRequested.type,
      onSuccess: changePasswordReceived.type,
      onError: changePasswordRequestFailed.type,
    })
  );
};

export const logs = (data) => (dispatch) => {
  dispatch(setLogs(data));
};

export const logout = () => async(dispatch) => {
  console.log("in logout...");
  // let tokenData = await axios.get(`${techdialer.hostname}/GetAgentToken?hostId=ace_agent1`)
  // console.log(" data ", tokenData.data.ResultString);
  // if(tokenData.status == 200) {
      
  // }
  // let token = tokenData.data.ResultString;
  // let logOutData = await axios.get(`${techdialer.hostname}/Logout?hostId=ace_agent1&tspltoken=${token}`)
  // console.log(" logOutData ", logOutData);
  dispatch(logoutRequested());
};

export const clearMessages = () => (dispatch) => {
  console.log("in clearMessages...");
  dispatch(clearMessagesRequested());
};

export const updateTerminalId = (terminalId) => (dispatch) => {
	console.log(" terminalId ", terminalId);
	dispatch(updateTerminalIdRequest(terminalId))
}



