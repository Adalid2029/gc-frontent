import { datagridActions } from "../actions/datagrid-actions";
import { handleActions } from "../utils/redux-helper";

const datagridRowsReducer = handleActions(
  {
    [datagridActions.DATA_RENDER]: (state, action) => {
      return action.data.data || [];
    },
  },
  []
);

export default datagridRowsReducer;
