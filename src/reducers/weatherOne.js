import * as actions from "../actions";

export default function weatherOne(
  state = {
    fetched: false,
    singleWeather: {},
    error: null
  },
  action
) {
  switch (action.type) {
    case actions.GET_WEATHER_ONE: {
      return {
        ...state,
        fetched: false
      };
    }
    case actions.SET_WEATHER_ONE: {
      return {
        ...state,
        singleWeather: action.weather,
        fetched: true,
        error: null
      };
    }
    case actions.GET_WEATHER_ONE_FAILED: {
      return {
        ...state,
        fetched: true,
        error: true
      };
    }
  }
  return state;
}
