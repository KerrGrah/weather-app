import { call, put, take, all, select } from "redux-saga/effects";
import diacritics from "diacritics";
import { apiKey } from "../config";

import {
  setWeatherFive,
  GET_WEATHER_FIVE,
  SET_WEATHER_LOCAL
} from "../actions";
import { citiesByCountryUrl } from "../config";

const getUserCountry = state => state.user.userCountry;

const fetchWeather = city => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/find?q=${city}&APPID=${apiKey}&cnt=1&units=metric&cluster=yes`
  )
    .then(res => res.json())
    .catch(() => "no weather here!")
    .then(
      res => (res.list.length > 0 ? res.list[0] : { name: city, error: true })
    );
};

const getWeatherSaga = function*() {
  const country = yield select(getUserCountry) || "RU";
  try {
    const json = yield fetch(`${citiesByCountryUrl}${country}`);
    const data = yield json.json();

    const fiveWeather = yield all(
      data.cities.map(city => {
        return call(fetchWeather, diacritics.remove(city));
      })
    );
    const parsed = [];
    fiveWeather.forEach(city => {
      if (city.error) {
        console.warn("No weather data for", city.name);
        parsed.push({ name: city.name, error: true });
      } else {
        parsed.push({
          name: city.name,
          ...city.main,
          ...city.weather[0],
          country: city.sys.country,
          id: city.id
        });
      }
    });
    //console.log(parsed);
    yield put(setWeatherFive(parsed, data.total));
  } catch (error) {
    yield put({ type: "FAILED_FIVE_WEATHER" });
  }
};

// on page load, but after user location is set to use user country
export const getFirstFive = function*() {
  while (true) {
    yield take(SET_WEATHER_LOCAL);
    yield put({ type: GET_WEATHER_FIVE });
  }
};

export const getWeatherFive = function*() {
  while (true) {
    yield take(GET_WEATHER_FIVE);
    yield call(getWeatherSaga);
  }
};
