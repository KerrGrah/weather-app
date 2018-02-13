import { makeActionCreator } from "./makeActionCreator";
export const SET_WEATHER_ONE = "SET_WEATHER_ONE";
export const setWeatherOne = makeActionCreator(SET_WEATHER_ONE, "weather");
