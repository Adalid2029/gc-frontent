import { REHYDRATE } from "redux-persist";
import { configurationActions } from "../actions/configuration-actions";
import { datagridActions } from "../actions/datagrid-actions";

const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case REHYDRATE:
      store.dispatch({
        type: datagridActions.REHYDRATE_VALIDATION,
      });

      break;

    case datagridActions.REHYDRATE_VALIDATION:
      store.dispatch({
        type: configurationActions.INIT_FETCH,
      });

      break;

    default:
      break;
  }

  return result;
};

export default persistMiddleware;
