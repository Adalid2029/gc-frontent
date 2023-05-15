import { handleActions } from "../utils/redux-helper";
import { errorActions } from "../actions/error-actions";

const initialState = {
  showError: false,
  validationError: false,
  failureError: false,
  message: null,
  details: null,
  errorsList: [],
};

const resetError = () => {
  return {
    ...initialState,
  };
};

const errorReducer = handleActions(
  {
    [errorActions.MODAL_CLOSE]: resetError,
    [errorActions.RESPONSE_ERROR]: (state, action) => {
      return {
        ...state,
        showError: true,
        validationError: action.validationError || false,
        failureError: action.failureError || false,
        message: action.message || null,
        details: action.details || null,
        errorsList: action.errorsList || [],
      };
    },
  },
  initialState
);

export default errorReducer;
