/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/* global __webpack_public_path__ */

// Fixing warning: "Symbol.observable as defined by Redux and Redux DevTools do not match".
// This below line will polyfill Symbol.observable
// eslint-disable-next-line
import Symbol_observable from "symbol-observable";

const groceryCrudLoader = require("./grocery-crud-loader").default;
if (window.GroceryCrudConfiguration?.assetsUrl) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.GroceryCrudConfiguration.assetsUrl;
}

// We want to check that only when we explicitly have an autoLoad = false configuration to not autoload our app.
// On any other case (e.g. the GroceryCrudConfiguration is missing) we would like to auto-trigger
// the loading of the app.
if (window.GroceryCrudConfiguration?.autoLoad !== false) {
  document.querySelectorAll(".grocery-crud").forEach((myElement) => {
    groceryCrudLoader(myElement);
  });
}
