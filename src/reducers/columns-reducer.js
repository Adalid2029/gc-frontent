import { columnsActions } from "../actions/columns-actions";
import { handleActions } from "../utils/redux-helper";

const initialState = {
  columnsModalOpen: false,
};

const columnsReducer = handleActions(
  {
    [columnsActions.MODAL_OPEN]: (state) => {
      return {
        ...state,
        columnsModalOpen: true,
      };
    },
    [columnsActions.MODAL_CLOSE]: (state) => {
      return {
        ...state,
        columnsModalOpen: false,
      };
    },
  },
  {
    ...initialState,
  }
);

export default columnsReducer;
