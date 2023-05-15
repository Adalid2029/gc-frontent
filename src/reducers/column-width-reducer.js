import { handleActions } from "../utils/redux-helper";
import { columnWidthActions } from "../actions/column-width-actions";
import { datagridActions } from "../actions/datagrid-actions";
import { configurationActions } from "../actions/configuration-actions";

const initialState = {};

const resetColumnWidth = () => {
  return {};
};

const columnWidthReducer = handleActions(
  {
    [columnWidthActions.CHANGE_WIDTH]: (state, action) => {
      const { columnName, columnWidth } = action;

      // Currently - since we are taking the column width from the user - we need to validate the data
      const validatedColumnWidth = isNaN(parseInt(columnWidth, 10))
        ? 0
        : parseInt(columnWidth, 10);

      return {
        ...state,
        [columnName]: validatedColumnWidth + "px",
      };
    },
    [configurationActions.INIT_SUCCESS]: (state, action) => {
      const { columnWidth } = action.data;

      if (!columnWidth) {
        return state;
      }

      let finalColumnWidth = { ...state };

      Object.keys(columnWidth).forEach((columnName) => {
        const currentColumnWidth = columnWidth[columnName];
        if (!finalColumnWidth[columnName]) {
          finalColumnWidth[columnName] = currentColumnWidth;
        }
      });

      return finalColumnWidth;
    },
    [columnWidthActions.RESET_COLUMN_WIDTH]: resetColumnWidth,
    [datagridActions.CLEAR_CACHE]: resetColumnWidth,
    [datagridActions.REHYDRATE_VALIDATION]: (state) => {
      // TODO: Validate data
      return state;
    },
  },
  {
    ...initialState,
  }
);

export default columnWidthReducer;
