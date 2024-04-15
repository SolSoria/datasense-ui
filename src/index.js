import "./assets/css/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme/theme";
import rootReducer from "./reducers/rootReducer";
import { ChakraProvider } from "@chakra-ui/react";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { Provider } from "react-redux";
import { logger } from "./middlewares/logger";
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import Navigation from "./routes/Navigation";
const root = ReactDOM.createRoot(document.getElementById("root"));

const altCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = altCompose(applyMiddleware(logger));

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composedEnhancers)
export const persistor = persistStore(store);

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
