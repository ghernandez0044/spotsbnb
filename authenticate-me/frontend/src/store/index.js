// Necessary imports 
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotReducer from "./spots";
import spotImageReducer from "./spotimages";
import singleSpotReducer from "./oneSpot";

// Creating Root Reducer
const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spots: spotReducer,
  spotImages: spotImageReducer,
  singleSpot: singleSpotReducer
});


// Setting up ReactDevTools into the browser, the conditional check keeps the application from breaking if the browser does not support DevTools, the enhancer allows middleware to be added to the store upon creation
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Configuring - Creating the store
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
