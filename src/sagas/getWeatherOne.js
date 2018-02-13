import { call, put, take } from "redux-saga/effects";
import { setWeatherOne, GET_WEATHER_ONE } from "../actions";
import diacritics from "diacritics";
import { apiKey } from "../config";

const fetchWeather = (country, city) =>
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=metric`
  ).then(res => res.json());

export const getWeatherOne = function*() {
  while (true) {
    const action = yield take(GET_WEATHER_ONE);
    const { country, city } = action;
    const weather = yield call(
      fetchWeather,
      diacritics.remove(country),
      diacritics.remove(city)
    );
    yield put(setWeatherOne(weather));
  }
};
