import { datagridActions } from "../actions/datagrid-actions";
import { configurationActions } from "../actions/configuration-actions";
import { handleActions } from "../utils/redux-helper";
import { errorActions } from "../actions/error-actions";

const loading = () => {
  return true;
};

const notLoading = () => {
  return false;
};

const initialState = false;

const loadingReducer = handleActions(
  {
    [datagridActions.DATA_FETCH]: loading,
    [datagridActions.DATA_RENDER]: notLoading,
    [errorActions.RESPONSE_ERROR]: notLoading,
    [configurationActions.INIT_FAILURE]: notLoading,
    [configurationActions.INIT_FETCH]: loading,
  },
  initialState
);

export default loadingReducer;
