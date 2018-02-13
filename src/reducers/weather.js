import * as actions from "../actions";

export default function weather(
  state = {
    fetching: false,
    fetched: false,
    weatherLocal: null,
    weatherFive: [],
    currentPage: 0,
    pages: [],
    savedWeather: [],
    randomWeather: [],
    saved: [],
    savedIds: [],
    singleWeather: {}
  },
  action
) {
  switch (action.type) {
    case actions.SORT_BY_TEMPERATURE: {
      const sorted = state.savedWeather.slice().sort((a, b) => {
        return b.temp - a.temp;
      });
      return {
        ...state,
        savedWeather: sorted
      };
    }
    case actions.SORT_BY_ALPHABET: {
      const sorted = state.savedWeather.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });
      return {
        ...state,
        savedWeather: sorted
      };
    }
    case actions.GET_WEATHER_ONE: {
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    }
    case actions.SET_WEATHER_ONE: {
      return {
        ...state,
        singleWeather: action.weather,
        fetching: false,
        fetched: true
      };
    }
    case actions.CHANGE_PAGE: {
      return {
        ...state,
        currentPage:
          state.currentPage + action.change > 0
            ? state.currentPage + action.change
            : 0
      };
    }
    case actions.SET_WEATHER_LOCAL: {
      return {
        ...state,
        weatherLocal: action.weather
      };
    }
    case actions.SAVE_WEATHER: {
      return {
        ...state,
        savedWeather: [...state.savedWeather, action.weather],
        savedIds: [...state.savedIds, action.weather.id]
      };
    }
    case actions.DELETE_WEATHER: {
      const index = state.savedWeather.findIndex(
        obj =>
          obj.name === action.weather.name &&
          obj.country === action.weather.country
      );
      const idIndex = state.savedIds.indexOf(action.weather.id);
      return {
        ...state,
        savedWeather: [
          ...state.savedWeather.slice(0, index),
          ...state.savedWeather.slice(index + 1)
        ],
        savedIds: [
          ...state.savedIds.slice(0, idIndex),
          ...state.savedIds.slice(idIndex + 1)
        ]
      };
    }
    // on page load
    case actions.SET_SAVED_WEATHER: {
      return {
        ...state,
        savedWeather: action.savedWeather,
        saved: action.saved,
        savedIds: action.savedIds
      };
    }
    case actions.SET_WEATHER_FIVE: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        randomWeather: [...state.randomWeather, ...action.weather],
        weatherFive: action.weather,
        total: action.total,
        pages:
          action.total % 5 === 0
            ? action.total / 5
            : Number((action.total / 5).toFixed()) + 1
      };
    }
    case "FETCH_WEATHER_FULFILLED": {
      return {
        ...state
      };
    }
    case "FETCH_WEATHER_REJECTED": {
      return {
        ...state
      };
    }
    case "FETCH_CITIES_LIST": {
      return {
        ...state
      };
    }
    case "FETCH_CITIES_LIST_FULFILLED": {
      return {
        ...state
      };
    }
    case "FETCH_CITIES_LIST_REJECTED": {
      return {
        ...state
      };
    }
  }
  return state;
}
