import { makeActionCreator } from "./makeActionCreator";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const changePage = makeActionCreator(CHANGE_PAGE, "change");
