import * as actions from "../actions";

export default function user(
  state = {
    userCountry: null,
    location: {
      latitude: null,
      longitude: null
    },
    userInput: "",
    matchingCities: []
  },
  action
) {
  switch (action.type) {
    case actions.USER_INPUT_EMPTY: {
      return {
        ...state,
        userInput: "",
        matchingCities: []
      };
    }
    case actions.USER_INPUT_CHANGE: {
      return {
        ...state,
        userInput: action.input
      };
    }
    case actions.SET_MATCHING_CITIES: {
      return {
        ...state,
        matchingCities: action.matchingCities
      };
    }
    case actions.SET_USER_LOCATION: {
      return {
        ...state,
        location: {
          latitude: action.location.latitude,
          longitude: action.location.longitude
        }
      };
    }
    case actions.SET_USER_COUNTRY: {
      return {
        ...state,
        userCountry: action.userCountry
      };
    }
    //

    case "GET_USER_LOCATION_REJECTED": {
      return {
        ...state
      };
    }
    case "GET_USER_SAVED": {
      return {
        ...state
      };
    }
    case "GET_USER_SAVED_FULFILLED": {
      return {
        ...state
      };
    }
    case "GET_USER_SAVED_REJECTED": {
      return {
        ...state
      };
    }
  }
  return state;
}
