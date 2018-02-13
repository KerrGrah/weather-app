import { makeActionCreator } from "./makeActionCreator";
export const DELETE_WEATHER = "DELETE_WEATHER";

export const handleDelete = makeActionCreator(DELETE_WEATHER, "weather");
