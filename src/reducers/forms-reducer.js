import { formActions } from "../actions/form-actions";
import { addValuesToFieldTypes } from "../utils/form-fields";
import { handleActions } from "../utils/redux-helper";
import { errorActions } from "../actions/error-actions";

const initialState = {
  deleteOneModalOpen: false,
  deleteMultipleModalOpen: false,
  fields: [],
  modalLoading: false,
  loadingOverlay: false,
  modalOpen: false,
  operationState: null,
  primaryKeyValue: null,
  readOnly: false,
  closeModalOnSave: true,
};

const resetLoading = {
  modalLoading: false,
  loadingOverlay: false,
};

const formOperation = (state, action) => {
  return {
    ...state,
    operationState: action.type,
    primaryKeyValue: action.primaryKeyValue,
    modalOpen: true,
    modalLoading: true,
    fields: [],
  };
};

const formOperationLoad = (state, action) => {
  return {
    ...state,
    ...resetLoading,
    fields: addValuesToFieldTypes(action.fieldTypes, action.data.data),
    readOnly: action.type === formActions.READ_LOAD,
  };
};

const formOperationSuccess = (state) => {
  return {
    ...state,
    ...resetLoading,
    operationState: null,
    modalOpen: false,
    primaryKeyValue: null,
    fields: [],
  };
};

const formsReducer = handleActions(
  {
    [formActions.CLONE]: formOperation,
    [formActions.EDIT]: formOperation,
    [formActions.READ]: formOperation,

    [formActions.ADD_LOAD]: formOperationLoad,
    [formActions.CLONE_LOAD]: formOperationLoad,
    [formActions.EDIT_LOAD]: formOperationLoad,
    [formActions.READ_LOAD]: formOperationLoad,

    [formActions.INSERT_SUCCESS]: formOperationSuccess,
    [formActions.UPDATE_SUCCESS]: formOperationSuccess,

    [formActions.ADD]: (state, action) => {
      return {
        ...state,
        operationState: action.type,
        primaryKeyValue: null,
        modalOpen: true,
        modalLoading: true,
        fields: [],
      };
    },
    [formActions.UPDATE]: (state) => ({
      ...state,
      loadingOverlay: true,
    }),
    [formActions.DELETE]: (state, action) => {
      return {
        ...state,
        operationState: action.type,
        primaryKeyValue: action.primaryKeyValue,
        deleteOneModalOpen: true,
      };
    },

    [formActions.DELETE_MULTIPLE]: (state, action) => {
      return {
        ...state,
        operationState: action.type,
        deleteMultipleModalOpen: true,
      };
    },

    [formActions.MODAL_CLOSE]: (state) => {
      return {
        ...state,
        modalOpen: false,
        fields: [],
        operationState: null,
        primaryKeyValue: null,
      };
    },

    [formActions.DELETE_ONE_MODAL_CLOSE]: (state) => {
      return {
        ...state,
        deleteOneModalOpen: false,
        operationState: null,
        primaryKeyValue: null,
      };
    },

    [formActions.DELETE_MULTIPLE_MODAL_CLOSE]: (state) => {
      return {
        ...state,
        deleteMultipleModalOpen: false,
        operationState: null,
        primaryKeyValue: null,
      };
    },

    [errorActions.RESPONSE_ERROR]: (state) => {
      return {
        ...state,
        ...resetLoading,
      };
    },

    [formActions.DELETE_ACTION_MULTIPLE_SUCCESS]: (state) => {
      return {
        ...state,
        deleteMultipleModalOpen: false,
        operationState: null,
      };
    },

    [formActions.DELETE_ACTION_ONE_SUCCESS]: (state) => {
      return {
        ...state,
        deleteOneModalOpen: false,
        operationState: null,
        primaryKeyValue: null,
      };
    },

    [formActions.TOGGLE_CLOSE_MODAL_ON_SAVE]: (state) => {
      return {
        ...state,
        closeModalOnSave: !state.closeModalOnSave,
      };
    },
  },
  {
    ...initialState,
  }
);

export default formsReducer;
