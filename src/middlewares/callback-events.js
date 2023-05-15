import { formActions } from "../actions/form-actions";

const callbackEvents = (configurationSettings) => {
  return (store) => (next) => (action) => {
    next(action);

    const state = store.getState();

    switch (action.type) {
      case formActions.UPDATE: {
        if (configurationSettings.callbackBeforeUpdate) {
          configurationSettings.callbackBeforeUpdate({
            data: action.data,
            primaryKeyValue: state.form.primaryKeyValue,
          });
        }

        break;
      }

      case formActions.INSERT: {
        if (configurationSettings.callbackBeforeInsert) {
          configurationSettings.callbackBeforeInsert({
            data: action.data,
          });
        }

        break;
      }

      case formActions.UPDATE_SUCCESS: {
        if (configurationSettings.callbackAfterUpdate) {
          configurationSettings.callbackAfterUpdate({
            primaryKeyValue: action.primaryKeyValue,
          });
        }

        break;
      }

      case formActions.INSERT_SUCCESS: {
        if (configurationSettings.callbackAfterInsert) {
          configurationSettings.callbackAfterInsert({
            primaryKeyValue: action.primaryKeyValue,
          });
        }

        break;
      }

      case formActions.DELETE_ACTION_ONE: {
        if (configurationSettings.callbackBeforeDelete) {
          configurationSettings.callbackBeforeDelete({
            selectedIds: [state.form.primaryKeyValue],
          });
        }
        break;
      }

      case formActions.DELETE_ACTION_MULTIPLE_SUCCESS:
      case formActions.DELETE_ACTION_ONE_SUCCESS: {
        if (configurationSettings.callbackAfterDelete) {
          configurationSettings.callbackAfterDelete({});
        }
        break;
      }

      case formActions.DELETE_ACTION_MULTIPLE: {
        if (configurationSettings.callbackBeforeDelete) {
          configurationSettings.callbackBeforeDelete({
            selectedIds: state.configuration.selectedIds,
          });
        }
        break;
      }

      default:
        break;
    }
  };
};

export default callbackEvents;
