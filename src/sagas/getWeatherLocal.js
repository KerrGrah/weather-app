import { call, put, take } from "redux-saga/effects";
import { setUserCountry, setWeatherLocal } from "../actions";
import { apiKey } from "../config";

const fetchWeather = (latitude, longitude) =>
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`
  );

export const getWeatherLocal = function*() {
  const action = yield take("SET_USER_LOCATION");
  const { latitude, longitude } = action.location;
  const json = yield call(fetchWeather, latitude, longitude);
  const weather = yield json.json();

  const parsed = {
    name: weather.name,
    ...weather.main,
    ...weather.weather[0],
    country: weather.sys.country,
    id: weather.id
  };
  yield put(setUserCountry(weather.sys.country));
  yield put(setWeatherLocal(parsed));
};
