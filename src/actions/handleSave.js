import { makeActionCreator } from "./makeActionCreator";
export const SAVE_WEATHER = "SAVE_WEATHER";

export const handleSave = makeActionCreator(SAVE_WEATHER, "weather");
