import { call, put, take, all } from "redux-saga/effects";
import { setSavedWeather, GET_SAVED_WEATHER } from "../actions";
import diacritics from "diacritics";
import { apiKey } from "../config";

export const getSavedWeather = function*() {
  yield take(GET_SAVED_WEATHER);
  let saved = localStorage.getItem("weather");
  let savedIds = localStorage.getItem("weatherIds");
  if (saved && savedIds) {
    saved = JSON.parse(saved);
    savedIds = JSON.parse(savedIds);

    const weather = yield all(
      saved.map(id => {
        return call(
          fetchWeather,
          diacritics.remove(id[1]),
          diacritics.remove(id[0])
        );
      })
    );
    const parsed = [];
    weather.forEach(city => {
      if (city.error) {
        console.warn("No weather data for", city.name);
        parsed.push({ name: "Saved City", error: true });
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
    yield put(setSavedWeather(parsed, saved, savedIds));
  }
};

const fetchWeather = (city, country) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=metric&cluster=yes`
  )
    .then(res => res.json())
    .catch(() => ({ error: true }));
};
