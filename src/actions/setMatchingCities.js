import { makeActionCreator } from "./makeActionCreator";
export const SET_MATCHING_CITIES = "SET_MATCHING_CITIES";

export const setMatchingCities = makeActionCreator(
  SET_MATCHING_CITIES,
  "matchingCities"
);
