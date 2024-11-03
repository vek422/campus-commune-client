import authReducer from "./authReducer";
import { combineReducers } from "@reduxjs/toolkit";
import communeReducer from "./CommuneReducer"
export const rootReducer = combineReducers({
  auth: authReducer,
  commune: communeReducer,
});
