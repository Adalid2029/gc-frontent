import { filteringActions } from "../actions/filtering-actions";
import { handleActions } from "../utils/redux-helper";

const initialState = {
  modalOpen: false,
};

const filteringReducer = handleActions(
  {
    [filteringActions.MODAL_OPEN]: (state) => {
      return {
        ...state,
        modalOpen: true,
      };
    },
    [filteringActions.FORM_SUBMIT]: (state) => {
      return {
        ...state,
        modalOpen: false,
      };
    },
    [filteringActions.MODAL_CLOSE]: (state) => {
      return {
        ...state,
        modalOpen: false,
      };
    },
  },
  {
    ...initialState,
  }
);

export default filteringReducer;
