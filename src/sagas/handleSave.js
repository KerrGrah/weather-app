import { call, put, take } from "redux-saga/effects";
import { SAVE_WEATHER } from "../actions";

export const handleSave = function*() {
  while (true) {
    const { weather } = yield take(SAVE_WEATHER);
    const stored = localStorage.getItem("weather");
    const storedIds = localStorage.getItem("weatherIds");
    if (stored && storedIds) {
      const parsed = JSON.parse(stored);
      const parsedIds = JSON.parse(storedIds);
      parsed.push([weather.country, weather.name]);
      parsedIds.push(weather.id);
      const json = JSON.stringify(parsed);
      const jsonIds = JSON.stringify(parsedIds);
      localStorage.setItem("weather", json);
      localStorage.setItem("weatherIds", jsonIds);
    } else {
      const json = JSON.stringify([[weather.country, weather.name]]);
      localStorage.setItem("weather", json);
      const jsonIds = JSON.stringify([weather.id]);
      localStorage.setItem("weatherIds", jsonIds);
    }
  }
};
