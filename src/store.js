import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import { initSagas } from "./initSagas";

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(logger, sagaMiddleware);

const store = createStore(reducer, middleware);
initSagas(sagaMiddleware);

export default store;
