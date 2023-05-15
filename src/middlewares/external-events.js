import { publishEvent } from "../utils/events";
import { datagridActions } from "../actions/datagrid-actions";

const externalEvents = (publishEvents) => {
  let firstTimeEvent = true;
  return () => (next) => (action) => {
    next(action);

    const { type: actionType, ...rest } = action;

    // We would like to trigger external events only when the configuration is enabled
    if (!publishEvents) {
      return;
    }

    // We don't want to publish events for core actions
    if (
      actionType.startsWith("@@") ||
      actionType.startsWith("persist") ||
      actionType.endsWith("REHYDRATE_VALIDATION")
    ) {
      return;
    }

    if (firstTimeEvent === true && actionType === datagridActions.DATA_RENDER) {
      firstTimeEvent = false;
      publishEvent("gcrud.datagrid.ready");
    }

    publishEvent("gcrud." + actionType.replace(/\//, "."), { ...rest });
  };
};

export default externalEvents;
