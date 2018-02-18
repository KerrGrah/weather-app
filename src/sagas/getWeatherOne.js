import { call, put, take } from "redux-saga/effects";
import {
  setWeatherOne,
  getWeatherOneFailed,
  GET_WEATHER_ONE
} from "../actions";
import diacritics from "diacritics";
import { apiKey } from "../config";

const fetchWeather = (country, city) =>
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=metric`
  )
    .then(res => res)
    .catch(error => {
      console.log("ERROR");
    });
export const getWeatherOne = function*() {
  while (true) {
    const action = yield take(GET_WEATHER_ONE);
    const { country, city } = action;
    try {
      const response = yield call(
        fetchWeather,
        diacritics.remove(country),
        diacritics.remove(city)
      );
      if (response.ok) {
        const parsed = yield response.json();
        yield put(setWeatherOne(parsed));
      } else {
        console.log(response);
        throw new Error(response.status);
      }
    } catch (error) {
      yield put(getWeatherOneFailed(country, city, error));
    }
  }
};
