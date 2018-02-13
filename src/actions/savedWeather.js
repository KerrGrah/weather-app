import { makeActionCreator } from "./makeActionCreator";
export const GET_SAVED_WEATHER = "GET_SAVED_WEATHER";
export const SET_SAVED_WEATHER = "SET_SAVED_WEATHER";

export const setSavedWeather = makeActionCreator(
  SET_SAVED_WEATHER,
  "savedWeather",
  "saved",
  "savedIds"
);
