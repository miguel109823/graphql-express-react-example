import { combineReducers } from "redux";
import api from "services/api";

export default combineReducers({
  [api.reducerPath]: api.reducer,
});
