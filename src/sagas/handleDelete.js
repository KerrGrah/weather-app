import { take } from "redux-saga/effects";
import { DELETE_WEATHER } from "../actions";

export const handleDelete = function*() {
  while (true) {
    const { weather } = yield take(DELETE_WEATHER);

    const stored = localStorage.getItem("weather");
    const storedIds = localStorage.getItem("weatherIds");
    if (stored && storedIds) {
      const parsed = JSON.parse(stored);
      const parsedIds = JSON.parse(storedIds);
      parsed.forEach((el, i, arr) => {
        if (el[1] === weather.name && el[0] === weather.country) {
          arr.splice(i, 1);
        }
      });
      parsedIds.forEach((el, i, arr) => {
        if (el == weather.id) {
          arr.splice(i, 1);
        }
      });
      const json = JSON.stringify(parsed);
      const jsonIds = JSON.stringify(parsedIds);
      localStorage.setItem("weather", json);
      localStorage.setItem("weatherIds", jsonIds);
    }
  }
};
