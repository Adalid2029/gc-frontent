import { handleActions } from "../utils/redux-helper";
import { formActions } from "../actions/form-actions";
import { fieldTypes } from "../constants/field-types";
import { dependedFieldsActions } from "../actions/depended-fields-actions";

const initialState = {
  permittedValues: {},
};

const setPermittedValues = (state, action) => {
  let permittedValues = {};

  action.fieldTypes.forEach((field) => {
    if (field.dataType === fieldTypes.DEPENDED_RELATIONAL) {
      if (action.data.data[field.fieldName]) {
        permittedValues[field.fieldName] =
          action.data.data[field.fieldName].permittedValues;
      }
    }
  });

  return {
    ...state,
    permittedValues: {
      ...state.permittedValues,
      ...permittedValues,
    },
  };
};

const dependedRelation = handleActions(
  {
    [formActions.ADD_LOAD]: setPermittedValues,
    [formActions.CLONE_LOAD]: setPermittedValues,
    [formActions.EDIT_LOAD]: setPermittedValues,
    [formActions.READ_LOAD]: setPermittedValues,
    [dependedFieldsActions.UPDATE_PERMITTED_VALUES]: (state, action) => {
      const { permittedValues, resetPermittedValuesForFields } = action;
      let updatedPermittedValues = {
        ...permittedValues,
      };

      resetPermittedValuesForFields.forEach((resetFieldName) => {
        updatedPermittedValues[resetFieldName] = [];
      });

      return {
        ...state,
        permittedValues: {
          ...state.permittedValues,
          ...updatedPermittedValues,
        },
      };
    },
  },
  initialState
);

export default dependedRelation;
