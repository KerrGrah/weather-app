import { makeActionCreator } from "./makeActionCreator";

export const GET_USER_LOCATION = "GET_USER_LOCATION";
export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const SET_USER_COUNTRY = "SET_USER_COUNTRY";
export const setUserLocation = makeActionCreator(SET_USER_LOCATION, "location");

export const setUserCountry = makeActionCreator(
  SET_USER_COUNTRY,
  "userCountry"
);
