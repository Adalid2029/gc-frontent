import storage from "redux-persist/lib/storage";
import { StrictMode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { persistConstants } from "./constants/persist";
import { persistReducer, persistStore } from "redux-persist";
import groceryCrudReducers from "./reducers";
import serverRequestMiddleware from "./middlewares/server-request-middleware";
import urlMiddleware from "./middlewares/url-middleware";
import multipleSelectionsMiddleware from "./middlewares/multiple-selections-middleware";
import persistMiddleware from "./middlewares/persist-middleware";
import { configurationActions } from "./actions/configuration-actions";
import App from "./App";
import { render } from "react-dom";
import externalEvents from "./middlewares/external-events";
import callbackEvents from "./middlewares/callback-events";

const groceryCrudLoader = (myElement, settings = {}) => {
  const {
    apiUrl,
    landingPageUrl,
    uniqueId,
    theme,
    loadCssTheme = "true",
    loadCssIcons = "true",
    loadCssThirdParty = "true",
    skin,
    publishEvents,
    masterPrimaryKeyValue,
  } = myElement.dataset;

  const {
    callbackBeforeInsert,
    callbackBeforeUpdate,
    callbackAfterInsert,
    callbackAfterUpdate,
    callbackBeforeDelete,
    callbackAfterDelete,
    onRowUpdate,
    onRowUnmount,
    addFields,
    editFields,
    cloneFields,
    readFields,
    actionButtons,
    actionButtonsMultiple,
    hasCache = true,
  } = settings;

  let configurationSettings = {
    callbackBeforeInsert,
    callbackBeforeUpdate,
    callbackAfterInsert,
    callbackAfterUpdate,
    callbackBeforeDelete,
    callbackAfterDelete,
    onRowUpdate,
    onRowUnmount,
    addFields,
    editFields,
    cloneFields,
    readFields,
    actionButtons,
    actionButtonsMultiple,
  };

  const persistConfig = {
    key: uniqueId,
    storage,
    blacklist: persistConstants.blacklistedKeys,
  };

  let persistedReducer;

  if (hasCache) {
    persistedReducer = persistReducer(persistConfig, groceryCrudReducers);
  }

  const groceryCrudStore = configureStore({
    reducer: hasCache ? persistedReducer : groceryCrudReducers,
    middleware: [
      serverRequestMiddleware,
      urlMiddleware,
      multipleSelectionsMiddleware,
      persistMiddleware,
      externalEvents(publishEvents === "true"),
      callbackEvents(configurationSettings),
    ],
    devTools: true,
  });

  groceryCrudStore.dispatch({
    type: configurationActions.MAIN_CONFIGURATION,
    apiUrl,
    landingPageUrl,
    masterPrimaryKeyValue,
  });

  // If there is no cache we don't have to wait for any persist events to start
  // with the init fetch
  if (!hasCache) {
    groceryCrudStore.dispatch({
      type: configurationActions.INIT_FETCH,
    });
  }

  let groceryCrudPersistor;

  if (hasCache) {
    groceryCrudPersistor = persistStore(groceryCrudStore);
  }

  render(
    <StrictMode>
      <App
        {...{
          groceryCrudPersistor,
          groceryCrudStore,
          loadCssIcons: loadCssIcons === "true",
          loadCssTheme: loadCssTheme === "true",
          loadCssThirdParty: loadCssThirdParty === "true",
          settings,
          skin,
          theme,
          configurationSettings,
        }}
      />
    </StrictMode>,
    myElement
  );
};

if (window) {
  // Also make it available globally
  window.groceryCrudLoader = groceryCrudLoader;
}

export default groceryCrudLoader;
