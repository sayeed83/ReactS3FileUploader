import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  data: null,
  financierBasicData: null,
  financierUserData: {
    data: [],
  },
  financierUploadDocumentData: {
    data: [],
  },
  financierPreviousEmail: {
    data: [],
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
  name: "financiers",
  initialState,
  reducers: {
    financiersRequested: (financiers, action) => {
      financiers.loading = true;
      financiers.status = undefined;
      financiers.message = null;
      financiers.error = {};
    },
    financiersReceived: (financiers, action) => {
      financiers.data = action.payload.data;
      financiers.loading = false;
      financiers.lastFetch = Date.now();
      financiers.message = null;
      financiers.status = "success";
      financiers.error = {};
    },
    financiersRequestFailed: (financiers, action) => {
      financiers.loading = false;
      financiers.message = null;
      financiers.status = "error";
      financiers.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    createFinancierUserRequested: (financiers, action) => {
      financiers.loading = true;
      financiers.status = undefined;
      financiers.message = null;
      financiers.error = {};
    },
    createFinancierUserReceived: (financiers, action) => {
      //financier.data = action.payload.data;
      financiers.loading = false;
      financiers.lastFetch = Date.now();
      financiers.message = action.payload.message;
      financiers.status = "success";
      financiers.error = {};
    },
    createFinancierUserRequestFailed: (financiers, action) => {
      financiers.loading = false;
      financiers.message = null;
      financiers.status = "error";
      financiers.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    editFinancierRequested: (financiers, action) => {
      financiers.loading = true;
      financiers.status = undefined;
      financiers.message = null;
      financiers.error = {};
    },
    editFinancierReceived: (financiers, action) => {
      //financier.data = action.payload.data;
      financiers.loading = false;
      financiers.lastFetch = Date.now();
      financiers.message = action.payload.message;
      financiers.status = "success";
      financiers.error = {};
    },
    editFinancierRequestFailed: (financiers, action) => {
      financiers.loading = false;
      financiers.message = null;
      financiers.status = "error";
      financiers.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    editFinancierDocumentRequested: (financiers, action) => {
      financiers.loading = true;
      financiers.status = undefined;
      financiers.message = null;
      financiers.error = {};
    },
    editFinancierDocumentReceived: (financiers, action) => {
      //financier.data = action.payload.data;
      financiers.loading = false;
      financiers.lastFetch = Date.now();
      financiers.message = action.payload.message;
      financiers.status = "success";
      financiers.error = {};
    },
    editFinancierDocumentRequestFailed: (financiers, action) => {
      financiers.loading = false;
      financiers.message = null;
      financiers.status = "error";
      financiers.error =
        action.payload.response !== null || action.payload.response !== undefined
          ? action.payload.response.data
          : action.payload.message;
    },

    setFinancierBasicData: (financiers, action) => {
      financiers.financierBasicData = action.payload;
    },
    setFinancierUserData: (financiers, action) => {
      console.log(" action.payload setFinancierUserData ======= ", action.payload);
      financiers.financierUserData.data.push(action.payload);
    },
    setFinancierDocumentUploadData: (financiers, action) => {
      console.log(" action.payload setFinancierDocumentUploadData ======= ", action.payload);
      financiers.financierUploadDocumentData.data = [];
      if (action.payload) {
        for (let index = 0; index < action.payload.length; index++) {
          const element = action.payload[index];
          // console.log(" element ======= ", element);
          financiers.financierUploadDocumentData.data.push(element)
        }
      }


    },
    setFinancierPrevoiusEmail: (financiers, action) => {
      financiers.financierPreviousEmail.data.push(action.payload);
    },
    financierBasicAndUserClearMessagesRequested: (financiers) => {
      financiers.financierUserData.data = [];
      financiers.financierBasicData = null;
    },
    financiersPreEmailClearMsgRequested: (financiers) => {
      financiers.financierPreviousEmail.data = [];
      financiers.financierBasicData = null;
      financiers.financierUploadDocumentData.data = [];
    },

    clearMessagesRequested: (financiers) => {
      financiers.error = {};
      financiers.status = undefined;
      financiers.message = null;
      financiers.loading = false;
    },
    financierClearStorageRequested: () => initialState,
  },
});

const {
  financiersRequested,
  financiersReceived,
  financiersRequestFailed,

  createFinancierUserRequested,
  createFinancierUserReceived,
  createFinancierUserRequestFailed,

  editFinancierRequested,
  editFinancierReceived,
  editFinancierRequestFailed,

  editFinancierDocumentRequested,
  editFinancierDocumentReceived,
  editFinancierDocumentRequestFailed,

  setFinancierBasicData,
  setFinancierUserData,
  setFinancierDocumentUploadData,
  setFinancierPrevoiusEmail,
  financiersPreEmailClearMsgRequested,
  financierBasicAndUserClearMessagesRequested,

  clearMessagesRequested,
  financierClearStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators




export const createFinancierUser = (
  userId, financierName, email, telephone, address1,
  pincode, city, state, nbfc, nbfcName,
  nbfcLicense, nbfcDescription, nbfcAddress, monthEndDate,
  division,district, taluka, landmark
) => (dispatch, getState) => {
  console.log(
    "Invoking createFinancierUser Api with",
    userId, financierName, email, telephone, address1,
    pincode, city, state, nbfc, nbfcName,
    nbfcLicense, nbfcDescription, nbfcAddress, monthEndDate,
    division,district, taluka, landmark
  );

  const getFinancierState = getState();
  console.log('getFinancierState.entities.financiers:', getFinancierState.entities.financiers)
  // console.log('financierUserData:', data)

  const { financierUserData, financierUploadDocumentData } = getFinancierState.entities.financiers;
  // console.log('financierUserData:', financierUserData.data)
  // console.log('financierUploadDocumentData:', financierUploadDocumentData.data)

  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'ADD_FINANCIER',
        userId, financierName, email, telephone, address1,
        pincode, city, state, nbfc, nbfcName,
        nbfcLicense, nbfcDescription, nbfcAddress, monthEndDate,
        division,district, taluka, landmark,
        user: financierUserData.data,
        uploadData: financierUploadDocumentData.data
      },
      onStart: createFinancierUserRequested.type,
      onSuccess: createFinancierUserReceived.type,
      onError: createFinancierUserRequestFailed.type,
    })
  );
};

export const addFinancierUser = (
  userId, financierId
) => (dispatch, getState) => {
  console.log(
    "Invoking edit Financier Api with",
    userId, financierId
  );

  const getFinancierState = getState();
  const { data } = getFinancierState.entities.financiers.financierUserData;
  //const { financierBasicData } = getFinancierState.entities.financiers;
  console.log('edit  financierUserData:', data)
  //console.log('financier basicData:', financierBasicData);

  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'ADD_FINANCIER',
        userId,
        financierId,
        user: data
      },
      onStart: editFinancierRequested.type,
      onSuccess: editFinancierReceived.type,
      onError: editFinancierRequestFailed.type,
    })
  );
};

export const editFinancier = (
  userId, financierId
) => (dispatch, getState) => {
  console.log(
    "Invoking edit Financier Api with",
    userId, financierId
  );

  const getFinancierState = getState();
  //const { data } = getFinancierState.entities.financiers.financierUserData;
  const { financierBasicData } = getFinancierState.entities.financiers;
  //console.log('edit  financierUserData:', data)
  console.log('financier basicData:', financierBasicData);

  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'EDIT_FINANCIER',
        userId,
        financierId,
        "name": financierBasicData !== null ? financierBasicData.financierName : '',
        "telephone": financierBasicData !== null ? financierBasicData.telephone : '',
        "nbfcName": financierBasicData !== null ? financierBasicData.nbfcName : '',
        "nbfcLicense": financierBasicData !== null ? financierBasicData.nbfcLicense : '',
        "nbfcDescription": financierBasicData !== null ? financierBasicData.nbfcDescription : '',
        "nbfcAddress": financierBasicData !== null ? financierBasicData.nbfcAddress : '',
        "monthEndDate": financierBasicData !== null ? financierBasicData.monthEndDate : '',
        "address": financierBasicData !== null ? financierBasicData.addressLine1 : '',
        "landmark": financierBasicData !== null ? financierBasicData.landmark : '',
        "division": financierBasicData !== null ? financierBasicData.division : '',
        "city": financierBasicData !== null ? financierBasicData.city : '',
        "taluka": financierBasicData !== null ? financierBasicData.taluka : '',
        "district": financierBasicData !== null ? financierBasicData.district : '',
        "state": financierBasicData !== null ? financierBasicData.state : '',
        "pincode": financierBasicData !== null ? financierBasicData.pinCode : '',
        //"startDate": financierBasicData !== null ? financierBasicData.startDate : '',
        // "endDate": financierBasicData !== null ? financierBasicData.endDate : '',
        //user: data
      },
      onStart: editFinancierRequested.type,
      onSuccess: editFinancierReceived.type,
      onError: editFinancierRequestFailed.type,
    })
  );
};

export const editFinancierUser = (
  userId, financierId
) => (dispatch, getState) => {
  console.log(
    "Invoking edit Financier Api with",
    userId, financierId
  );

  const getFinancierState = getState();
  const { data } = getFinancierState.entities.financiers.financierUserData;
  //const { financierBasicData } = getFinancierState.entities.financiers;
  console.log('edit  financierUserData:', data)
  //console.log('financier basicData:', financierBasicData);

  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'EDIT_FINANCIER',
        userId,
        financierId,
        user: data
      },
      onStart: editFinancierRequested.type,
      onSuccess: editFinancierReceived.type,
      onError: editFinancierRequestFailed.type,
    })
  );
};

export const editFinancierDocument = (
  userId, financierId, uploadDocumentData
) => (dispatch, getState) => {
  console.log(
    "Invoking editFinancierDocument",
    userId, financierId, uploadDocumentData
  );

  console.log(' uploadDocumentData : ', uploadDocumentData)
  //console.log('financier basicData:', financierBasicData);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'EDIT_FINANCIER',
        userId,
        financierId,
        uploadDcumentArray: uploadDocumentData
      },
      onStart: editFinancierDocumentRequested.type,
      onSuccess: editFinancierDocumentReceived.type,
      onError: editFinancierDocumentRequestFailed.type,
    })
  );
};


export const financiers = (userId, agencyId) => (dispatch, getState) => {
  console.log("Invoking financiers Api", userId);
  dispatch(
    apiCallBegan({
      url: "/api/v1/service",
      method: "post",
      data: {
        feature: 'GET_FINANCIER',
        userId
      },
      onStart: financiersRequested.type,
      onSuccess: financiersReceived.type,
      onError: financiersRequestFailed.type,
    })
  );
};

export const addFinancierBasicData = (data) => (dispatch, getState) => {
  dispatch(setFinancierBasicData(data));
};
export const addFinancierUserData = (data) => (dispatch, getState) => {
  dispatch(setFinancierUserData(data));
};
export const financierDocumentUploadData = (data) => (dispatch, getState) => {
  console.log(" financierDocumentUploadData called ========== ", data);
  dispatch(setFinancierDocumentUploadData(data));
};
export const financierPreviousEmailData = (data) => (dispatch, getState) => {
  dispatch(setFinancierPrevoiusEmail(data));
};
export const financiersPreEmailDataClearMsg = () => (dispatch) => {
  dispatch(financiersPreEmailClearMsgRequested());
};

export const financierBasicAndUserClearMessages = () => (dispatch) => {
  console.log("in financierBasicAndUserClearMessages...");
  dispatch(financierBasicAndUserClearMessagesRequested());
};

export const financierClearMessages = () => (dispatch) => {
  console.log("in clearMessages...");
  dispatch(clearMessagesRequested());
};

export const financierClearStorage = () => (dispatch) => {
  console.log("in financierClearStorage...");
  dispatch(financierClearStorageRequested());
};
