import { makeActionCreator } from "./makeActionCreator";
export const SET_WEATHER_LOCAL = "SET_WEATHER_LOCAL";
export const setWeatherLocal = makeActionCreator(SET_WEATHER_LOCAL, "weather");
