import { handleActions } from "../utils/redux-helper";
import { masterDetailActions } from "../actions/master-detail-actions";
import { configurationActions } from "../actions/configuration-actions";

const initialState = {
  openedRows: [],
  apiUrl: "",
};

const masterDetailReducer = handleActions(
  {
    [masterDetailActions.OPEN_ROW]: (state, action) => {
      const { rowId } = action;
      return {
        ...state,
        openedRows: [...state.openedRows, rowId],
      };
    },
    [masterDetailActions.CLOSE_ROW]: (state, action) => {
      const { rowId } = action;
      return {
        ...state,
        openedRows: state.openedRows.filter((id) => id !== rowId),
      };
    },
    [configurationActions.INIT_SUCCESS]: (state, action) => {
      const { masterDetail } = action.data;

      if (typeof masterDetail === "object") {
        return {
          ...state,
          apiUrl: masterDetail.apiUrl,
        };
      }

      return {
        ...state,
      };
    },
  },
  {
    ...initialState,
  }
);

export default masterDetailReducer;
