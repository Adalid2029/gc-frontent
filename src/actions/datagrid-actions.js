const datagridActionsPrefix = "datagrid";

export const datagridActions = {
  CLEAR_CACHE: `${datagridActionsPrefix}/clear-cache`,
  CLEAR_FILTERING: `${datagridActionsPrefix}/clear-filtering`,
  COLUMNS_MODAL_CLOSE: `${datagridActionsPrefix}/columns-modal-close`,
  COLUMNS_MODAL_OPEN: `${datagridActionsPrefix}/columns-modal`,
  COLUMN_ORDERING: `${datagridActionsPrefix}/column-ordering`,
  COLUMN_SEARCH: `${datagridActionsPrefix}/column-search`,
  DATA_FAILURE: `${datagridActionsPrefix}/data-failure`,
  DATA_FETCH: `${datagridActionsPrefix}/data-fetch`,
  DATA_RENDER: `${datagridActionsPrefix}/data-render`,
  ORDERING_RESET: `${datagridActionsPrefix}/ordering-reset`,
  PAGE_CHANGE: `${datagridActionsPrefix}/page-change`,
  PER_PAGE_CHANGE: `${datagridActionsPrefix}/per-page-change`,
  READY: `${datagridActionsPrefix}/ready`,
  REHYDRATE_VALIDATION: `${datagridActionsPrefix}/REHYDRATE_VALIDATION`,
  SELECT_ROWS: `${datagridActionsPrefix}/select-rows`,
  SELECT_ROW_ALL_OR_NONE: `${datagridActionsPrefix}/select-rows-all-or-none`,
  SELECT_ROW_TOGGLE: `${datagridActionsPrefix}/select-row-toggle`,
};
