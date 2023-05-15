import { fieldTypes } from "../constants/field-types";

export function fieldTypesGroupingPerOperation(rawData) {
  let groupedFieldTypes = {
    fieldTypes: [],
    fieldTypesAddForm: [],
    fieldTypesCloneForm: [],
    fieldTypesColumns: [],
    fieldTypesEditForm: [],
    fieldTypesReadForm: [],
  };

  const fieldTypesMapping = {
    columns: "fieldTypesColumns",
    addFields: "fieldTypesAddForm",
    cloneFields: "fieldTypesCloneForm",
    editFields: "fieldTypesEditForm",
    readFields: "fieldTypesReadForm",
  };

  // Just adding some extra data to the default field types
  Object.keys(rawData.fieldTypes).forEach((fieldName) => {
    const fieldTypeData = rawData.fieldTypes[fieldName];

    if (fieldTypeData.dataType === fieldTypes.INVISIBLE) {
      return true;
    }

    groupedFieldTypes.fieldTypes.push({
      fieldName: fieldName,
      ...fieldTypeData,
    });
  });

  Object.keys(fieldTypesMapping).forEach((fieldTypeName) => {
    const fieldTypeDataName = fieldTypesMapping[fieldTypeName];

    rawData[fieldTypeName].forEach((fieldData) => {
      const currentFieldTypeData = rawData[fieldTypeDataName][fieldData.name]
        ? rawData[fieldTypeDataName][fieldData.name]
        : rawData.fieldTypes[fieldData.name];

      // Skipping the check for "fieldTypesColumns" as this will be filtered within the reducer later
      // This is the only exception as we have a duplication of the same data (e.g. fieldTypesColumns and columns)
      // for a quicker access to ordering columns and columns visibility
      if (
        fieldTypeDataName !== fieldTypesMapping.columns &&
        currentFieldTypeData.dataType === fieldTypes.INVISIBLE
      ) {
        return true;
      }

      groupedFieldTypes[fieldTypeDataName].push({
        fieldName: fieldData.name,
        displayAs: fieldData.displayAs,
        ...currentFieldTypeData,
      });
    });
  });

  return groupedFieldTypes;
}

export function addValuesToFieldTypes(fields, data) {
  let mergedFieldTypes = [];
  let dependencyFields = {};

  fields.forEach((field) => {
    switch (field.dataType) {
      case fieldTypes.RELATIONAL:
      case fieldTypes.RELATIONAL_NATIVE:
      case fieldTypes.DEPENDED_RELATIONAL: {
        if (field.options && field.options.dependedFrom) {
          field.options.dependedFrom.forEach((dependencyField) => {
            dependencyFields[dependencyField] = true;
          });
        }

        break;
      }
      default: {
        dependencyFields[field.fieldName] = false;
        break;
      }
    }
  });

  fields.forEach((field) => {
    let fieldValue;
    let valueLabel = null;
    const { fieldName } = field;

    switch (field.dataType) {
      case fieldTypes.RELATIONAL_N_N_NATIVE:
      case fieldTypes.RELATIONAL_N_N: {
        fieldValue = data[fieldName] ? data[fieldName] : [];
        break;
      }
      case fieldTypes.DEPENDED_RELATIONAL: {
        fieldValue = data[fieldName] ? data[fieldName].value : "";
        break;
      }
      case fieldTypes.DYNAMIC_RELATION: {
        fieldValue = data[fieldName] ? data[fieldName].value : "";
        valueLabel = data[fieldName] ? data[fieldName].label : "";
        break;
      }
      default: {
        fieldValue = data[fieldName] ? data[fieldName] : "";
      }
    }

    mergedFieldTypes.push({
      ...field,
      isDependencyField: dependencyFields[fieldName] === true,
      fieldValue,
      valueLabel,
    });
  });

  return mergedFieldTypes;
}

export function formSubmitTransformation(data, formFields = []) {
  let dataToSubmit = {};

  // Just to save some loops, we are adding all the field types into an object for quick access
  let fieldTypesByFieldName = {};

  formFields.forEach((field) => {
    fieldTypesByFieldName[field.fieldName] = field.dataType;
  });

  Object.keys(data).forEach((fieldName) => {
    const fieldValue = data[fieldName];

    switch (fieldTypesByFieldName[fieldName]) {
      case fieldTypes.MULTISELECT_NATIVE:
      case fieldTypes.MULTISELECT_SEARCHABLE: {
        dataToSubmit[fieldName] = Array.isArray(fieldValue)
          ? fieldValue.join(",")
          : fieldValue;
        break;
      }

      case fieldTypes.BACKEND_CALLBACK: {
        const fieldFromDom = document.querySelector(`input[name=${fieldName}]`);
        if (fieldFromDom !== null) {
          dataToSubmit[fieldName] = fieldFromDom.value;
        } else {
          dataToSubmit[fieldName] = "";
        }
        break;
      }

      default: {
        dataToSubmit[fieldName] = fieldValue;
        break;
      }
    }
  });

  return dataToSubmit;
}
