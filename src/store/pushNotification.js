import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

import { apiCallBegan } from "./api";
const initialState = {
    data: {
      notification: []
    },
    pushNotificationSendList: {
      data: null,
      loading: false,
      lastFetch: null,
      message: null,
      status: undefined,
      error: {},
      sendPushNotificationType: '',
      sendPushNotificationTypeId: ''
    },
    addNotification: {
      data: null,
      loading: false,
      lastFetch: null,
      message: null,
      status: undefined,
      error: {}
    },
    loading: false,
    lastFetch: null,
    message: null,
    status: undefined,
    error: {},
}

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationListRequested: (notification, action) => {
        notification.loading = true;
        notification.status = undefined;
        notification.message = null;
        notification.error = {};
    },
    notificationListReceived: (notification, action) => {
        let notificationCopy = original(notification.data);
        // console.log(" notificationCopy ========= ", notificationCopy);
        // console.log(" action.payload.data ========= ", action.payload.data);
        notification.data = action.payload.data;
        notification.limit = action.payload.data.limit;
        notification.offset = action.payload.data.offset;
        notification.hasMore = action.payload.data.hasMore;
        notification.loading = false;
        notification.lastFetch = Date.now();
        notification.message = null;
        notification.status = "success";
        notification.error = {};
    },
    notificationListRequestFailed: (notification, action) => {
        notification.loading = false;
        notification.loggedIn = false;
        notification.status = "error";
        notification.message = null;
        notification.error =
            action.payload.response != null || action.payload.response != undefined
            ? action.payload.response.data
            : action.payload.message;
    },
    sendPushNotificationListRequested: (notification, action) => {
      notification.pushNotificationSendList.loading = true;
      notification.pushNotificationSendList.status = undefined;
      notification.pushNotificationSendList.message = null;
      notification.pushNotificationSendList.error = {};
    },
    sendPushNotificationListReceived: (notification, action) => {
      let notificationCopy = original(notification.pushNotificationSendList);
      console.log(" notificationCopy ", notificationCopy);
      if(notificationCopy.data) {
        notificationCopy = notificationCopy.data.data
      } else {
        notificationCopy = '';
      }
      console.log(" notificationCopy ", notificationCopy);
      console.log(" action.payload.data.loan ", action.payload.data.data);
      if(notificationCopy) {
        notification.pushNotificationSendList.data.data = [...notificationCopy, ...action.payload.data.data];
      } 
      else {
        notification.pushNotificationSendList.data = action.payload.data;
      }
        
        
        
        notification.pushNotificationSendList.limit = action.payload.data.limit;
        notification.pushNotificationSendList.offset = action.payload.data.offset;
        notification.pushNotificationSendList.hasMore = action.payload.data.hasMore;
        notification.pushNotificationSendList.loading = false;
        notification.pushNotificationSendList.lastFetch = Date.now();
        notification.pushNotificationSendList.message = null;
        notification.pushNotificationSendList.status = "success";
        notification.pushNotificationSendList.error = {};
        notification.pushNotificationSendList.sendPushNotificationType = action.payload.data.sendPushNotificationType;
        notification.pushNotificationSendList.sendPushNotificationTypeId = action.payload.data.sendPushNotificationTypeId;
    },
    searchSendPushNotificationListReceived: (notification, action) => {
      
      notification.pushNotificationSendList.data = action.payload.data;
      notification.pushNotificationSendList.limit = action.payload.data.limit;
      notification.pushNotificationSendList.offset = action.payload.data.offset;
      notification.pushNotificationSendList.hasMore = action.payload.data.hasMore;
      notification.pushNotificationSendList.loading = false;
      notification.pushNotificationSendList.lastFetch = Date.now();
      notification.pushNotificationSendList.message = null;
      notification.pushNotificationSendList.status = "success";
      notification.pushNotificationSendList.error = {};
      notification.pushNotificationSendList.sendPushNotificationType = action.payload.data.sendPushNotificationType;
      notification.pushNotificationSendList.sendPushNotificationTypeId = action.payload.data.sendPushNotificationTypeId;
    },
    sendPushNotificationListRequestFailed: (notification, action) => {
        notification.pushNotificationSendList.loading = false;
        notification.pushNotificationSendList.loggedIn = false;
        notification.pushNotificationSendList.status = "error";
        notification.pushNotificationSendList.message = null;
        notification.pushNotificationSendList.error =
            action.payload.response != null || action.payload.response != undefined
            ? action.payload.response.data
            : action.payload.message;
    },
    addNotificationRequested: (notification, action) => {
      notification.addNotification.loading = true;
      notification.addNotification.status = undefined;
      notification.addNotification.message = null;
      notification.addNotification.error = {};
    },
    addNotificationReceived: (notification, action) => {
        // console.log(" notificationCopy ========= ", notificationCopy);
        console.log(" action.payload.data ========= ", action.payload);
        notification.addNotification.data = action.payload.data;
        notification.addNotification.loading = false;
        notification.addNotification.message = action.payload.message;
        notification.addNotification.status = "success";
        notification.addNotification.error = {};
    },
    addNotificationRequestFailed: (notification, action) => {
        notification.addNotification.loading = false;
        notification.addNotification.loggedIn = false;
        notification.addNotification.status = "error";
        notification.addNotification.message = null;
        notification.addNotification.error =
            action.payload.response != null || action.payload.response != undefined
            ? action.payload.response.data
            : action.payload.message;
    },
    clearNotificationStorageRequest: () => initialState,
  },
});

const {
  notificationListRequested,
  notificationListReceived,
  notificationListRequestFailed,
  sendPushNotificationListRequested,
  sendPushNotificationListReceived,
  searchSendPushNotificationListReceived,
  sendPushNotificationListRequestFailed,
  addNotificationRequested,
  addNotificationReceived,
  addNotificationRequestFailed,
  clearNotificationStorageRequest
} = slice.actions;
export default slice.reducer;

export const notificationList = (userId) => (dispatch, getState) => {
    console.log('Invoking notification Api', userId)
    dispatch(
      apiCallBegan({
        url: "/api/v1/service",
        method: "post",
        data: {
          feature: 'PUSH_NOTIFICATION_LIST',
          userId
        },
        onStart: notificationListRequested.type,
        onSuccess: notificationListReceived.type,
        onError: notificationListRequestFailed.type,
      })
    );
};

export const addNotification = (userId, notificationTitle, notificationBody, userIds) => (dispatch, getState) => {
  console.log('Invoking addNotification Api', userId, notificationTitle, notificationBody, userIds)
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'SEND_PUSH_NOTIFICATION',
        userId, notificationTitle, notificationBody, userIds
      },
      onStart: addNotificationRequested.type,
      onSuccess: addNotificationReceived.type,
      onError: addNotificationRequestFailed.type,
    })
  );
};

export const sendPushnotificationList = (userId, sendPushNotificationType, sendPushNotificationTypeId, offset, limit, search='') => (dispatch, getState) => {
  console.log('Invoking sendPushnotificationList Api', userId, sendPushNotificationType, sendPushNotificationTypeId)
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'SEND_PUSH_NOTIFICATION_LIST',
        userId,sendPushNotificationType,sendPushNotificationTypeId, offset, limit
      },
      onStart: sendPushNotificationListRequested.type,
      onSuccess: search == 'search' ? searchSendPushNotificationListReceived : sendPushNotificationListReceived.type,
      onError: sendPushNotificationListRequestFailed.type,
    })
  );
};
export const clearNotificationStorage = () => (dispatch) => {
  console.log("in clearLoanStorage...");
  dispatch(clearNotificationStorageRequest());
};



