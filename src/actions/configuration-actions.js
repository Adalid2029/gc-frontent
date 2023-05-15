const configurationActionsPrefix = "configuration";

export const configurationActions = {
  DATAGRID_FETCH: `${configurationActionsPrefix}/datagrid-fetch`,
  DATAGRID_LOAD_FAILURE: `${configurationActionsPrefix}/datagrid-failure`,
  DATAGRID_LOAD_SUCCESS: `${configurationActionsPrefix}/datagrid-success`,
  INIT_FETCH: `${configurationActionsPrefix}/init-fetch`,
  MAIN_CONFIGURATION: `${configurationActionsPrefix}/main-configuration`,
  INIT_FAILURE: `${configurationActionsPrefix}/init-failure`,
  INIT_SUCCESS: `${configurationActionsPrefix}/init`,

  // For testing purposes only
  SET_OPEN_IN_MODAL: `${configurationActionsPrefix}/set-open-in-modal`,
  SET_URL_HISTORY: `${configurationActionsPrefix}/set-url-history`,
};
