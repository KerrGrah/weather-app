import { makeActionCreator } from "./makeActionCreator";

export const GET_WEATHER_FIVE = "GET_WEATHER_FIVE";
export const SET_WEATHER_FIVE = "SET_WEATHER_FIVE";

export const setWeatherFive = makeActionCreator(
  SET_WEATHER_FIVE,
  "weather",
  "total"
);
