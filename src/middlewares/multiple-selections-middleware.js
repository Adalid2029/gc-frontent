import { datagridActions } from "../actions/datagrid-actions";

const multipleSelectionsMiddleware = (store) => {
  return (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    switch (action.type) {
      case datagridActions.SELECT_ROW_ALL_OR_NONE: {
        if (
          state.configuration.selectedIds.length >= state.datagridRows.length
        ) {
          store.dispatch({
            type: datagridActions.SELECT_ROWS,
            selectedIds: [],
          });
        } else {
          let selectedIds = [];
          state.datagridRows.forEach((row) => {
            selectedIds.push(row.grocery_crud_extras.primaryKeyValue);
          });
          store.dispatch({
            type: datagridActions.SELECT_ROWS,
            selectedIds,
          });
        }
        break;
      }

      default:
        break;
    }

    return result;
  };
};
export default multipleSelectionsMiddleware;
