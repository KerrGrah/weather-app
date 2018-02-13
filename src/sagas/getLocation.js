import { call, put, take } from "redux-saga/effects";
import { setUserLocation, GET_USER_LOCATION } from "../actions";

const options = {
  enableHighAccuracy: false
};

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const getLocation = function*() {
  yield take(GET_USER_LOCATION);
  let latitude = localStorage.getItem("userLatitude");
  let longitude = localStorage.getItem("userLongitude");
  if (longitude && latitude) {
    yield put(setUserLocation({ latitude, longitude }));
  } else {
    let position = yield call(getCurrentPosition);
    let { latitude, longitude } = position.coords;
    localStorage.setItem("userLatitude", latitude);
    localStorage.setItem("userLongitude", longitude);
    yield put(setUserLocation({ latitude, longitude }));
  }
};
