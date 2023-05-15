import { configurationActions } from "../actions/configuration-actions";
import { formActions } from "../actions/form-actions";
import { getReduxActionFromUrl } from "../utils/urls";

const urlSegmentNameMapping = {
  [formActions.ADD]: "add",
  [formActions.CLONE]: "clone",
  [formActions.EDIT]: "edit",
  [formActions.READ]: "read",
};

const urlMiddleware = (store) => {
  return (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    const actionType = action.type;

    switch (actionType) {
      case formActions.ADD:
      case formActions.CLONE:
      case formActions.EDIT:
      case formActions.READ: {
        if (
          action.reason !== configurationActions.INIT_SUCCESS &&
          state.configuration.urlHistory
        ) {
          let url = /\/$/.test(window.location.href)
            ? window.location.href + urlSegmentNameMapping[actionType]
            : window.location.href + "/" + urlSegmentNameMapping[actionType];

          if (action.primaryKeyValue !== undefined) {
            url += "/" + action.primaryKeyValue;
          }

          window.history.pushState({}, "", new URL(url));
        }
        break;
      }

      case formActions.INSERT_SUCCESS:
      case formActions.UPDATE_SUCCESS:
      case formActions.MODAL_CLOSE: {
        const urlAction = getReduxActionFromUrl();
        let newUrl = null;

        if (state.configuration.urlHistory) {
          switch (urlAction.type) {
            case formActions.ADD:
              newUrl = window.location.href.replace(/\/add$/, "");
              break;
            case formActions.CLONE:
              newUrl = window.location.href.replace(/\/clone\/\d+$/, "");
              break;
            case formActions.EDIT:
              newUrl = window.location.href.replace(/\/edit\/\d+$/, "");
              break;
            case formActions.READ:
              newUrl = window.location.href.replace(/\/read\/\d+$/, "");
              break;
            default:
              break;
          }

          if (newUrl !== null) {
            window.history.pushState({}, "", new URL(newUrl));
          }
        }

        break;
      }

      case configurationActions.INIT_SUCCESS: {
        // Triggering an action from the URL info
        if (state.configuration.urlHistory) {
          const nextAction = getReduxActionFromUrl();
          if (nextAction.type !== null) {
            store.dispatch(nextAction);
          }
        }
        break;
      }

      default:
        break;
    }

    return result;
  };
};
export default urlMiddleware;
