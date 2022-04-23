import { combineReducers } from '@reduxjs/toolkit';
import authenticationReducer from './authentication';
import dashboardReducer from './dashboard';
import loanReducer from './loan';
import lookupReducer from './lookup';
import agencyReducer from './agency';
import financierReducer from './financier';
import uploadReducer from './upload';
import checkEmailReducer from './checkEmail';
import userListReducer from './userList';
import todayReducer from './today';
import legalReducer from './legal';
import trackLegalReducer from './trackLegalNotice';
import noitificationListReducer from './noitificationList';
import dataExportListReducer from './dataExport';
import pushNotificationReducer from './pushNotification';
import templateConfigReducer from './templateConfigration';
import longRunningProcessReducer from './longRunningProcess';
import teleCallerReducer from './teleCaller';
import eventsReducer from './events';
import summaryReducer from './summary'
import financierDashboardReducer from './financierDashboard';

export default combineReducers({
  auth: authenticationReducer,
  loan: loanReducer,
  dashboard: dashboardReducer,
  agency: agencyReducer,
  financiers: financierReducer,
  upload: uploadReducer,
  checkEmail: checkEmailReducer,
  lookup: lookupReducer,
  userList: userListReducer,
  today: todayReducer,
  legal: legalReducer,
  trackLegal: trackLegalReducer,
  noitificationList: noitificationListReducer,
  dataExport: dataExportListReducer,
  pushNotification: pushNotificationReducer,
  templateConfig: templateConfigReducer,
  longRunningProcess: longRunningProcessReducer,
  teleCaller: teleCallerReducer,
  events: eventsReducer,
  summary: summaryReducer,
  financierDashboard: financierDashboardReducer
});