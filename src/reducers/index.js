import { combineReducers } from "redux";

import weather from "./weather";
import weatherOne from "./weatherOne";
import user from "./user";

export default combineReducers({
  weather,
  weatherOne,
  user
});
