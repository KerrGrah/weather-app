import { makeActionCreator } from "./makeActionCreator";
export const GET_WEATHER_ONE = "GET_WEATHER_ONE";

export const getWeatherOne = makeActionCreator(
  GET_WEATHER_ONE,
  "country",
  "city"
);
