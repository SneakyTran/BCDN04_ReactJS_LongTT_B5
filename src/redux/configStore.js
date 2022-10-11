import { combineReducers, createStore } from "redux";
import { studentManagementReducer } from "./reducers/studentManagementReducer";

const rootReducer = combineReducers({
    studentManagementReducer,
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
