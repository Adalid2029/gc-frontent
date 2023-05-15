import debounce from "lodash/debounce";
import { datagridActions } from "../actions/datagrid-actions";
import { configurationActions } from "../actions/configuration-actions";
import { sendGetRequest, sendPostRequest } from "../utils/request";
import i18n from "../utils/locale/i18n";
import { formActions } from "../actions/form-actions";
import { filteringActions } from "../actions/filtering-actions";
import { getReduxActionFromUrl } from "../utils/urls";
import { errorActions } from "../actions/error-actions";
import { columnsActions } from "../actions/columns-actions";
import { dependedFieldsActions } from "../actions/depended-fields-actions";
import { searchAsyncActions } from "../actions/search-async-actions";
import { transformExtendedSearchData } from "../utils/filtering-helper";
import { dispatchUnknownResponse } from "../utils/error-messages";

const serverActionMapping = {
  [formActions.ADD]: "add-form",
  [formActions.CLONE]: "clone-form",
  [formActions.DELETE_ACTION_ONE]: "remove-one",
  [formActions.DELETE_ACTION_MULTIPLE]: "remove-multiple",
  [formActions.EDIT]: "edit-form",
  [formActions.READ]: "read-form",
  [formActions.UPDATE]: "update",
  [formActions.INSERT]: "insert",
};

const serverNextActionMapping = {
  [formActions.ADD]: formActions.ADD_LOAD,
  [formActions.CLONE]: formActions.CLONE_LOAD,
  [formActions.EDIT]: formActions.EDIT_LOAD,
  [formActions.READ]: formActions.READ_LOAD,
  [formActions.INSERT]: formActions.INSERT_SUCCESS,
  [formActions.UPDATE]: formActions.UPDATE_SUCCESS,
  [formActions.DELETE_ACTION_ONE]: formActions.DELETE_ACTION_ONE_SUCCESS,
  [formActions.DELETE_ACTION_MULTIPLE]:
    formActions.DELETE_ACTION_MULTIPLE_SUCCESS,
};

const fieldTypesMapping = {
  [formActions.ADD]: "fieldTypesAddForm",
  [formActions.CLONE]: "fieldTypesCloneForm",
  [formActions.EDIT]: "fieldTypesEditForm",
  [formActions.READ]: "fieldTypesReadForm",
};

const serverResponseStatus = {
  SUCCESS: "success",
  VALIDATION_ERROR: "error",
  FAILURE: "failure",
};

const datagridRequest = (store) => {
  store.dispatch({
    type: datagridActions.DATA_FETCH,
  });
};

const datagridRequestDebounced = debounce(
  (store) => datagridRequest(store),
  1000
);

const serverRequestMiddleware = (store) => {
  let apiUrl, csrfToken;

  return (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    const actionType = action.type;

    const { dispatch } = store;

    switch (actionType) {
      case datagridActions.COLUMN_SEARCH: {
        if (action.searchValue === "") {
          dispatch({
            type: datagridActions.DATA_FETCH,
          });
        } else {
          datagridRequestDebounced(store);
        }
        break;
      }
      case datagridActions.PAGE_CHANGE: {
        if (
          action.pageValue === 1 ||
          action.pageValue === state.datagrid.lastPage
        ) {
          dispatch({
            type: datagridActions.DATA_FETCH,
          });
        } else {
          datagridRequestDebounced(store);
        }
        break;
      }

      case datagridActions.CLEAR_CACHE:
      case datagridActions.CLEAR_FILTERING:
      case datagridActions.COLUMN_ORDERING:
      case datagridActions.ORDERING_RESET:
      case datagridActions.PER_PAGE_CHANGE:
      case filteringActions.FORM_SUBMIT:
      case formActions.DELETE_ACTION_MULTIPLE_SUCCESS:
      case formActions.DELETE_ACTION_ONE_SUCCESS: {
        if (actionType === datagridActions.CLEAR_CACHE) {
          dispatch({
            type: columnsActions.RESET_ORDERING,
            columns: state.configuration.columns,
            reason: datagridActions.CLEAR_CACHE,
          });
        }

        dispatch({
          type: datagridActions.DATA_FETCH,
        });
        break;
      }

      case formActions.INSERT_SUCCESS: {
        const lastPrimaryKeyValue = action.data ? action.data.insertId : null;

        if (state.form.closeModalOnSave === false) {
          dispatch({
            type: formActions.ADD,
          });
        }

        dispatch({
          type: datagridActions.DATA_FETCH,
          lastPrimaryKeyValue,
        });

        break;
      }

      case formActions.UPDATE_SUCCESS: {
        const lastPrimaryKeyValue = action.primaryKeyValue;

        if (state.form.closeModalOnSave === false) {
          dispatch({
            type: formActions.EDIT,
            primaryKeyValue: lastPrimaryKeyValue,
          });
        }

        dispatch({
          type: datagridActions.DATA_FETCH,
          lastPrimaryKeyValue,
        });
        break;
      }

      case configurationActions.MAIN_CONFIGURATION: {
        apiUrl = action.apiUrl;
        break;
      }

      case dependedFieldsActions.UPDATE_DEPENDENCY: {
        let dataToSend = {
          action: "depended-relation",
          field_name: action.fieldName,
          search_value: action.fieldValue,
        };

        if (csrfToken) {
          dataToSend[csrfToken.inputName] = csrfToken.inputValue;
        }

        sendGetRequest({
          url: apiUrl,
          dataToSend,
        })
          .then((response) => {
            if (response.body === null) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                message:
                  "We can't process the response of the server. Not well JSON formatted response.",
                details: response.text,
              });
              return true;
            }
            if (response.body.csrfToken) {
              csrfToken = response.body.csrfToken;
            }
            const { permittedValues, resetPermittedValuesForFields } =
              response.body;

            dispatch({
              type: dependedFieldsActions.UPDATE_PERMITTED_VALUES,
              permittedValues,
              resetPermittedValuesForFields,
            });
          })
          .catch((error) => {
            console.error(error);

            dispatchUnknownResponse(dispatch, error);
          });

        break;
      }

      case searchAsyncActions.SEARCH: {
        const { fieldName, resolveCallback, searchValue } = action;

        // If we have no resolveCallback function (it can happen during redux time travel or unit-testing),
        // then there is no point to send any ajax-request at the first place
        if (!resolveCallback) {
          break;
        }

        let dataToSend = {
          action: "ajax-search",
          field_name: fieldName,
          search_value: searchValue,
        };

        if (csrfToken) {
          dataToSend[csrfToken.inputName] = csrfToken.inputValue;
        }

        sendPostRequest({
          url: apiUrl,
          dataToSend,
        }).then((response) => {
          if (response.body === null) {
            return false;
          }

          if (response.body.csrfToken) {
            csrfToken = response.body.csrfToken;
          }

          if (response.body.items) {
            let options = [];
            response.body.items.forEach((item) => {
              options.push({
                value: item.id,
                label: item.title,
              });
            });

            resolveCallback(options);
          }
        });
        break;
      }

      case datagridActions.DATA_FETCH: {
        const {
          columnSearchValues,
          extendedSearchData,
          extendedSearchOperator,
          page,
          perPage,
          sorting,
          sortingFor,
        } = state.datagrid;

        const { masterPrimaryKeyValue } = state.configuration;

        // Canceling everything in the queue so we can make sure
        // that we send only one request
        datagridRequestDebounced.cancel();

        let dataToSend = {
          action: "datagrid",
          order_by: sortingFor,
          page: page,
          per_page: perPage,
          search: columnSearchValues,
          sorting,
        };

        if (masterPrimaryKeyValue) {
          dataToSend.master_id = masterPrimaryKeyValue;
        }

        if (csrfToken) {
          dataToSend[csrfToken.inputName] = csrfToken.inputValue;
        }

        if (extendedSearchData.length > 0) {
          dataToSend["extended_search"] =
            transformExtendedSearchData(extendedSearchData);
          dataToSend["basic_operator"] = extendedSearchOperator;
        }

        const lastPrimaryKeyValue = action.lastPrimaryKeyValue
          ? action.lastPrimaryKeyValue
          : null;

        sendPostRequest({
          url: apiUrl,
          dataToSend,
        })
          .then((response) => {
            if (response.body === null) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                message:
                  "We can't process the response of the server. Not well JSON formatted response.",
                details: response.text,
              });
              return true;
            }
            if (response.body.csrfToken) {
              csrfToken = response.body.csrfToken;
            }
            dispatch({
              type: datagridActions.DATA_RENDER,
              data: response.body,
              lastPrimaryKeyValue,
            });
          })
          .catch((error) => {
            console.error(error);
            dispatchUnknownResponse(dispatch, error);
          });
        break;
      }

      case configurationActions.INIT_FETCH: {
        sendGetRequest({
          url: apiUrl,
          dataToSend: {
            action: "initial",
          },
        })
          .then((response) => {
            if (response.body === null) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                message:
                  "We can't process the response of the server. Not well JSON formatted response.",
                details: response.text,
              });

              return true;
            }

            if (response.body.csrfToken) {
              csrfToken = response.body.csrfToken;
            }
            dispatch({
              type: configurationActions.INIT_SUCCESS,
              data: response.body,
            });
          })
          .catch((error) => {
            console.error(error);
            dispatchUnknownResponse(dispatch, error);
          });
        break;
      }

      case configurationActions.INIT_SUCCESS: {
        dispatch({
          type: datagridActions.DATA_FETCH,
        });
        i18n.init(action.data.i18n);

        // Triggering an action from the URL info
        if (state.configuration.urlHistory) {
          const nextAction = getReduxActionFromUrl();
          if (nextAction.type !== null) {
            dispatch(nextAction);
          }
        }
        break;
      }

      case formActions.ADD:
      case formActions.CLONE:
      case formActions.EDIT:
      case formActions.READ: {
        let dataToSend = {
          action: serverActionMapping[actionType],
        };

        if (action.primaryKeyValue !== undefined) {
          dataToSend.pk_value = action.primaryKeyValue;
        }

        sendGetRequest({
          url: apiUrl,
          dataToSend,
        })
          .then((response) => {
            if (response.body === null) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                message:
                  "We can't process the response of the server. Not well JSON formatted response.",
                details: response.text,
              });
              dispatch({
                type: formActions.MODAL_CLOSE,
                reason: errorActions.RESPONSE_ERROR,
              });

              return true;
            }

            if (response.body.csrfToken) {
              csrfToken = response.body.csrfToken;
            }
            if (response.body.status === serverResponseStatus.SUCCESS) {
              dispatch({
                type: serverNextActionMapping[actionType],
                data: response.body,
                fieldTypes: state.configuration[fieldTypesMapping[actionType]],
              });
            } else if (
              response.body.status === serverResponseStatus.FAILURE &&
              response.body.message
            ) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                failureError: true,
                message: response.body.message,
              });
              dispatch({
                type: formActions.MODAL_CLOSE,
                reason: errorActions.RESPONSE_ERROR,
              });
            } else {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                message: "We can't process the response of the server.",
                details: "".concat(
                  `Expected JSON response \`status\` to equal with "${serverResponseStatus.SUCCESS}".\n`,
                  `Got: "${response.body.status}" instead.`
                ),
              });
              dispatch({
                type: formActions.MODAL_CLOSE,
                reason: errorActions.RESPONSE_ERROR,
              });
            }
          })
          .catch((error) => {
            dispatch({
              type: formActions.MODAL_CLOSE,
              reason: errorActions.JAVASCRIPT_ERROR,
            });
            dispatch({
              type: errorActions.RESPONSE_ERROR,
              message: "A Javascript error has occurred!",
              details: error,
            });
          });
        break;
      }

      case formActions.INSERT:
      case formActions.UPDATE:
      case formActions.DELETE_ACTION_ONE:
      case formActions.DELETE_ACTION_MULTIPLE: {
        let dataToSend = {
          action: serverActionMapping[actionType],
        };

        if (actionType === formActions.UPDATE) {
          dataToSend.data = action.data;
          dataToSend.pk_value = state.form.primaryKeyValue;
        } else if (actionType === formActions.INSERT) {
          dataToSend.data = action.data;
        } else if (actionType === formActions.DELETE_ACTION_ONE) {
          dataToSend.primaryKeyValue = state.form.primaryKeyValue;
        } else if (actionType === formActions.DELETE_ACTION_MULTIPLE) {
          // TODO: We will need to have a last check that the selectedIds are the one shown in the datagrid
          dataToSend.primaryKeys = state.configuration.selectedIds;
        }

        if (csrfToken) {
          dataToSend[csrfToken.inputName] = csrfToken.inputValue;
        }

        sendPostRequest({
          url: apiUrl,
          dataToSend,
        })
          .then((response) => {
            if (response.body === null) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                message:
                  "We can't process the response of the server. Not well JSON formatted response.",
                details: response.text,
              });

              return true;
            }

            if (response.body.csrfToken) {
              csrfToken = response.body.csrfToken;
            }
            if (response.body.status === serverResponseStatus.SUCCESS) {
              dispatch({
                type: serverNextActionMapping[actionType],
                data: response.body,
                ...(serverNextActionMapping[actionType] ===
                formActions.UPDATE_SUCCESS
                  ? {
                      primaryKeyValue: state.form.primaryKeyValue,
                    }
                  : {}),
              });
            } else if (
              response.body.status === serverResponseStatus.VALIDATION_ERROR &&
              response.body.errors
            ) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                validationError: true,
                errorsList: response.body.errors,
              });
            } else if (
              response.body.status === serverResponseStatus.FAILURE &&
              response.body.message
            ) {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                failureError: true,
                message: response.body.message,
              });
            } else {
              dispatch({
                type: errorActions.RESPONSE_ERROR,
                message: "We can't process the response of the server.",
                details: "".concat(
                  `Expected JSON response \`status\` to equal with "${serverResponseStatus.SUCCESS}".\n`,
                  `Got: "${response.body.status}" instead.`
                ),
              });
            }
          })
          .catch((error) => {
            return dispatch({
              type: errorActions.RESPONSE_ERROR,
              message: "A Javascript error has occurred!",
              details: error,
            });
          });
        break;
      }

      default:
        break;
    }

    return result;
  };
};
export default serverRequestMiddleware;
