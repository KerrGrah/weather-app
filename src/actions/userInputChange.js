import { makeActionCreator } from "./makeActionCreator";
export const USER_INPUT_CHANGE = "USER_INPUT_CHANGE";
export const USER_INPUT_EMPTY = "USER_INPUT_EMPTY";

export const userInputChange = function() {
  makeActionCreator(USER_INPUT_CHANGE, "input");
};
