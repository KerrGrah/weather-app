import { makeActionCreator } from "./makeActionCreator";
export const GET_WEATHER_ONE_FAILED = "GET_WEATHER_ONE_FAILED";

export const getWeatherOneFailed = makeActionCreator(
  GET_WEATHER_ONE_FAILED,
  "country",
  "city",
  "error"
);
