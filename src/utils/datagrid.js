import { formatDate, formatDateTime, formatTime } from "./field-types";
import InputColorReadOnly from "../components/common/input-type/read-only/input-color-read-only";
import InputDropdownReadOnly from "../components/common/input-type/read-only/input-dropdown-read-only";
import InputRelationalReadOnly from "../components/common/input-type/read-only/input-relational-read-only";
import InputMultipleReadOnly from "../components/common/input-type/read-only/input-multiselect-read-only";
import InputFloatReadOnly from "../components/common/input-type/read-only/input-float-read-only";
import { fieldTypes } from "../constants/field-types";
import InputRelationalNtoNReadOnly from "../components/common/input-type/read-only/input-relational-n-to-n-read-only";
import InputBlobReadOnly from "../components/common/input-type/read-only/input-blob-read-only";
import InputUploadOneReadOnly from "../components/common/input-type/read-only/input-upload-one-read-only";
import InputUploadMultipleReadOnly from "../components/common/input-type/read-only/input-upload-multiple-read-only";

const {
  BLOB,
  DEPENDED_RELATIONAL,
  DROPDOWN,
  DROPDOWN_SEARCH,
  DYNAMIC_RELATION,
  ENUM,
  ENUM_SEARCHABLE,
  MULTISELECT_NATIVE,
  MULTISELECT_SEARCHABLE,
  RELATIONAL,
  RELATIONAL_NATIVE,
  RELATIONAL_N_N,
  RELATIONAL_N_N_NATIVE,
  TEXT,
  UPLOAD,
  UPLOAD_MULTIPLE,
} = fieldTypes;

let indexedPermittedValues = {};

const relationalShowValue = (value, { permittedValues }) => {
  return (
    <InputRelationalReadOnly value={value} permittedValues={permittedValues} />
  );
};

const relationalNtoNShowValue = (value, { permittedValues, fieldName }) => {
  if (!indexedPermittedValues[fieldName]) {
    indexedPermittedValues[fieldName] = {};
    permittedValues.forEach((option) => {
      indexedPermittedValues[fieldName][option.id] = option.title;
    });
  }

  return (
    <InputRelationalNtoNReadOnly
      value={value}
      indexedPermittedValues={indexedPermittedValues[fieldName]}
    />
  );
};

const dropdownShowValue = (value, { permittedValues }) => {
  return (
    <InputDropdownReadOnly value={value} permittedValues={permittedValues} />
  );
};

const multiselectShowValue = (value, { permittedValues }) => {
  return (
    <InputMultipleReadOnly
      value={value ? value.split(",") : []}
      permittedValues={permittedValues}
    />
  );
};

const dataTypeFormatMapping = {
  callback_column: (value) => {
    return <div dangerouslySetInnerHTML={{ __html: value }} />;
  },
  native_date: (value) => {
    return formatDate(value);
  },
  native_datetime: (value) => {
    return formatDateTime(value);
  },
  native_time: (value) => {
    return formatTime(value);
  },
  native_timestamp: (value) => {
    return formatDateTime(value);
  },
  date: (value, { locale }) => {
    return formatDate(value, locale);
  },
  datetime: (value, { locale }) => {
    return formatDateTime(value, locale);
  },
  time: (value, { locale }) => {
    return formatTime(value, locale);
  },
  timestamp: (value, { locale }) => {
    return formatDateTime(value, locale);
  },
  color: (value) => {
    return <InputColorReadOnly value={value} memo={false} />;
  },
  float: (value) => {
    return <InputFloatReadOnly value={value} />;
  },
  dropdown: dropdownShowValue,
  dropdown_search: dropdownShowValue,
  multiselect_native: multiselectShowValue,
  multiselect_searchable: multiselectShowValue,
  relational: relationalShowValue,
  relational_native: relationalShowValue,
  [RELATIONAL_N_N]: relationalNtoNShowValue,
  [RELATIONAL_N_N_NATIVE]: relationalNtoNShowValue,
  [BLOB]: (value, { fieldName, primaryKeyValue }) => {
    return (
      <InputBlobReadOnly
        value={value}
        name={fieldName}
        primaryKeyValue={primaryKeyValue}
      />
    );
  },
  [UPLOAD]: (value, { fieldName, primaryKeyValue, fieldOptions }) => {
    return (
      <InputUploadOneReadOnly
        value={value}
        name={fieldName}
        primaryKeyValue={primaryKeyValue}
        fieldOptions={fieldOptions}
      />
    );
  },
  [UPLOAD_MULTIPLE]: (value, { fieldName, primaryKeyValue, fieldOptions }) => {
    return (
      <InputUploadMultipleReadOnly
        value={value}
        name={fieldName}
        primaryKeyValue={primaryKeyValue}
        fieldOptions={fieldOptions}
      />
    );
  },
};

const classNamesDataTypeMapping = {
  [DEPENDED_RELATIONAL]: "input-select-search",
  [DROPDOWN]: "input-select",
  [DROPDOWN_SEARCH]: "input-select-search",
  [DYNAMIC_RELATION]: "input-select-search",
  [ENUM]: "input-select",
  [ENUM_SEARCHABLE]: "input-select-search",
  [MULTISELECT_NATIVE]: "input-select",
  [MULTISELECT_SEARCHABLE]: "input-select-search",
  [RELATIONAL]: "input-select-search",
  [RELATIONAL_NATIVE]: "input-select",
  [RELATIONAL_N_N]: "input-select-search",
  [RELATIONAL_N_N_NATIVE]: "input-select",
  [TEXT]: "input-text",
};

export const getClassNamesByDataType = (dataType) => {
  if (classNamesDataTypeMapping[dataType]) {
    return classNamesDataTypeMapping[dataType];
  }
  return classNamesDataTypeMapping["varchar"];
};

export const formatDatagridValue = (value, dataType, options = {}) => {
  if (dataTypeFormatMapping[dataType]) {
    return dataTypeFormatMapping[dataType](value, options);
  }

  return value ? <span>{value}</span> : "";
};
