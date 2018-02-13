import { put, take } from "redux-saga/effects";
import { USER_INPUT_CHANGE, setMatchingCities } from "../actions";
import { citiesByMatchUrl } from "../config";

export const getMatchingCities = function*() {
  while (true) {
    const { input } = yield take(USER_INPUT_CHANGE);
    const json = yield fetch(citiesByMatchUrl + input);
    const matching = yield json.json();
    yield put(setMatchingCities(matching.cities));
  }
};
