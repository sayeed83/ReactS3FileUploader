import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
    data: null,
    basicData: null,
    agencyUserData: {
        data: [],
    },
    agencyUploadDocumentData: {
        data: [],
    },
    previousEmail: {
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
    name: "agency",
    initialState,
    reducers: {
        agenciesRequested: (agency, action) => {
            agency.loading = true;
            agency.status = undefined;
            agency.message = null;
            agency.error = {};
        },
        agenciesReceived: (agency, action) => {
            agency.data = action.payload.data;
            agency.loading = false;
            agency.lastFetch = Date.now();
            agency.message = null;
            agency.status = "success";
            agency.error = {};
        },
        agenciesRequestFailed: (agency, action) => {
            agency.loading = false;
            agency.message = null;
            agency.status = "error";
            agency.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        createAgencyUserRequested: (agency, action) => {
            agency.loading = true;
            agency.status = undefined;
            agency.message = null;
            agency.error = {};
        },
        createAgencyUserReceived: (agency, action) => {
            // agency.data = action.payload.data;
            agency.loading = false;
            agency.lastFetch = Date.now();
            agency.message = action.payload.message;
            agency.status = "success";
            agency.error = {};
        },
        createAgencyUserRequestFailed: (agency, action) => {
            agency.loading = false;
            agency.message = null;
            agency.status = "error";
            agency.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        editAgencyRequested: (agency, action) => {
            agency.loading = true;
            agency.status = undefined;
            agency.message = null;
            agency.error = {};
        },
        editAgencyReceived: (agency, action) => {
            // agency.data = action.payload.data;
            agency.loading = false;
            agency.lastFetch = Date.now();
            agency.message = action.payload.message;
            agency.status = "success";
            agency.error = {};
        },
        editAgencyRequestFailed: (agency, action) => {
            agency.loading = false;
            agency.message = null;
            agency.status = "error";
            agency.error =
                action.payload.response !== null || action.payload.response !== undefined
                    ? action.payload.response.data
                    : action.payload.message;
        },

        setBasicData: (agency, action) => {
            agency.basicData = action.payload;
        },
        setAgencyUserData: (agency, action) => {
            agency.agencyUserData.data.push(action.payload);
        },
        setAgencyDocumentUploadData: (agency, action) => {
            agency.agencyUploadDocumentData.data.push(action.payload);
        },
        setPrevoiusEmail: (agency, action) => {
            agency.previousEmail.data.push(action.payload);
        },
        prevoiusEmailClearMessagesRequested: (agency) => {
            agency.previousEmail.data = [];
        },
        agencyBasicAndUserClearMessagesRequested: (agency) => {
            agency.agencyUserData.data = [];
            agency.basicData = null;
            agency.agencyUploadDocumentData.data = [];
        },

        clearMessagesRequested: (agency) => {
            agency.error = {};
            agency.status = undefined;
            agency.message = null;
            agency.loading = false;
        },
        agencyClearStorageRequested: () => initialState,
    },
});

const {
    agenciesRequested,
    agenciesReceived,
    agenciesRequestFailed,

    createAgencyUserRequested,
    createAgencyUserReceived,
    createAgencyUserRequestFailed,

    editAgencyRequested,
    editAgencyReceived,
    editAgencyRequestFailed,

    setBasicData,
    setAgencyUserData,
    setAgencyDocumentUploadData,
    setPrevoiusEmail,
    prevoiusEmailClearMessagesRequested,
    agencyBasicAndUserClearMessagesRequested,

    clearMessagesRequested,
    agencyClearStorageRequested
} = slice.actions;
export default slice.reducer;

// Action Creators


export const agencies = (userId, agencyId) => (dispatch, getState) => {
    console.log("Invoking agencies Api", userId);
    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'GET_AGENCY',
                userId
            },
            onStart: agenciesRequested.type,
            onSuccess: agenciesReceived.type,
            onError: agenciesRequestFailed.type,
        })
    );
};

export const createAgencyUser = (
    userId, agencyName, email, telephone, address1,
    pincode, city, state, operationalData, division, district, taluka, landmark,
    //agencyUserData
) => (dispatch, getState) => {
    console.log(
        "Invoking createAgencyUser Api with",
        userId, agencyName, email, telephone, address1,
        pincode, city, state, operationalData, division, district, taluka, landmark,
    );

    const getAgencyState = getState();
    const { data } = getAgencyState.entities.agency.agencyUserData;
    console.log('agencyUserData in slice:', data)


    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'ADD_AGENCY',
                userId, agencyName, email, telephone, address1,
                pincode, city, state, operationalData,
                division, district, taluka, landmark,
                user: data
            },
            onStart: createAgencyUserRequested.type,
            onSuccess: createAgencyUserReceived.type,
            onError: createAgencyUserRequestFailed.type,
        })
    );
};

export const addAgencyUser = (
    userId, agencyId
    //agencyUserData
) => (dispatch, getState) => {
    console.log(
        "Invoking edit agencyUser Api with",
        userId, agencyId
    );

    const getAgencyState = getState();
    const { data } = getAgencyState.entities.agency.agencyUserData;
    console.log('agencyUserData in slice:', data)

    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'ADD_AGENCY',
                userId,
                agencyId,
                user: data
            },
            onStart: editAgencyRequested.type,
            onSuccess: editAgencyReceived.type,
            onError: editAgencyRequestFailed.type,
        })
    );
};

export const editAgency = (
    userId, agencyId
) => (dispatch, getState) => {
    console.log(
        "Invoking edit agency Api with",
        userId, agencyId
    );

    const getAgencyState = getState();
    //const { data } = getAgencyState.entities.agency.agencyUserData;
    const { basicData } = getAgencyState.entities.agency;
    //console.log('agencyUserData in slice:', data)
    console.log('agency basicData:', basicData);

    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'EDIT_AGENCY',
                userId,
                agencyId,
                "name": basicData !== null ? basicData.agencyName : '',
                "telephone": basicData !== null ? basicData.telephone : '',
                "address": basicData !== null ? basicData.addressLine1 : '',
                // "addressLine2": basicData !== null ? basicData.addressLine2 : '',
                "landmark": basicData !== null ? basicData.landmark : '',
                "division": basicData !== null ? basicData.division : '',
                "city": basicData !== null ? basicData.city : '',
                "taluka": basicData !== null ? basicData.taluka : '',
                "district": basicData !== null ? basicData.district : '',
                "state": basicData !== null ? basicData.state : '',
                "pincode": basicData !== null ? basicData.pinCode : '',
                // "startDate": basicData !== null ? basicData.startDate : '',
                // "endDate": basicData !== null ? basicData.endDate : '',
                "operationalData": basicData !== null ? basicData.operationalData : ''
                //user: data
            },
            onStart: editAgencyRequested.type,
            onSuccess: editAgencyReceived.type,
            onError: editAgencyRequestFailed.type,
        })
    );
};

export const editAgencyUser = (
    userId, agencyId
    //agencyUserData
) => (dispatch, getState) => {
    console.log(
        "Invoking edit agencyUser Api with",
        userId, agencyId
    );

    const getAgencyState = getState();
    const { data } = getAgencyState.entities.agency.agencyUserData;
    console.log('agencyUserData in slice:', data)

    dispatch(
        apiCallBegan({
            url: "/api/v1/service",
            method: "post",
            data: {
                feature: 'EDIT_AGENCY',
                userId,
                agencyId,
                user: data
            },
            onStart: editAgencyRequested.type,
            onSuccess: editAgencyReceived.type,
            onError: editAgencyRequestFailed.type,
        })
    );
};

export const addBasicData = (data) => (dispatch, getState) => {
    dispatch(setBasicData(data));
};
export const addAgencyUserData = (data) => (dispatch, getState) => {
    dispatch(setAgencyUserData(data));
};

export const agencyDocumentUploadData = (data) => (dispatch, getState) => {
    dispatch(setAgencyDocumentUploadData(data));
};

export const previousEmailData = (data) => (dispatch, getState) => {
    dispatch(setPrevoiusEmail(data));
};

export const previousEmailDataClearMessages = () => (dispatch) => {
    dispatch(prevoiusEmailClearMessagesRequested());
};

export const agencyBasicAndUserClearMessages = () => (dispatch) => {
    console.log("in agencyBasicAndUserClearMessages...");
    dispatch(agencyBasicAndUserClearMessagesRequested());
};

export const agencyClearMessages = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(clearMessagesRequested());
};

export const agencyClearStorage = () => (dispatch) => {
    console.log("in clearMessages...");
    dispatch(agencyClearStorageRequested());
};

