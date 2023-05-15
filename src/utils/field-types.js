import memoizeOne from "memoize-one";

import { fieldTypes } from "../constants/field-types";
import InputBackendCallback from "../components/common/input-type/input-backend-callback";
import InputBlobReadOnly from "../components/common/input-type/read-only/input-blob-read-only";
import InputColor from "../components/common/input-type/input-color";
import InputColorReadOnly from "../components/common/input-type/read-only/input-color-read-only";
import InputDate from "../components/common/input-type/input-date";
import InputDateReadOnly from "../components/common/input-type/read-only/input-date-read-only";
import InputDateTime from "../components/common/input-type/input-date-time";
import InputDateTimeReadOnly from "../components/common/input-type/read-only/input-date-time-read-only";
import InputDropdown from "../components/common/input-type/input-dropdown";
import InputDropdownReadOnly from "../components/common/input-type/read-only/input-dropdown-read-only";
import InputDropdownSearch from "../components/common/input-type/input-dropdown-search";
import InputEmail from "../components/common/input-type/input-email";
import InputEnum from "../components/common/input-type/input-enum";
import InputEnumSearchable from "../components/common/input-type/input-enum-searchable";
import InputFloat from "../components/common/input-type/input-float";
import InputFloatReadOnly from "../components/common/input-type/read-only/input-float-read-only";
import InputHidden from "../components/common/input-type/input-hidden";
import InputMultiselectNative from "../components/common/input-type/input-multiselect-native";
import InputMultiselectReadOnly from "../components/common/input-type/read-only/input-multiselect-read-only";
import InputMultiselectSearchable from "../components/common/input-type/input-multiselect-searchable";
import InputNativeDate from "../components/common/input-type/input-native-date";
import InputNativeDateReadOnly from "../components/common/input-type/read-only/input-native-date-read-only";
import InputNativeDateTime from "../components/common/input-type/input-native-date-time";
import InputNativeDateTimeReadOnly from "../components/common/input-type/read-only/input-native-date-time-read-only";
import InputNativeTime from "../components/common/input-type/input-native-time";
import InputNativeTimeReadOnly from "../components/common/input-type/read-only/input-native-time-read-only";
import InputNumeric from "../components/common/input-type/input-numeric";
import InputPassword from "../components/common/input-type/input-password";
import InputRelational from "../components/common/input-type/input-relational";
import InputRelationalNative from "../components/common/input-type/input-relational-native";
import InputRelationalNativeNtoN from "../components/common/input-type/input-relational-native-n-to-n";
import InputRelationalNtoN from "../components/common/input-type/input-relational-n-to-n";
import InputRelationalNtoNReadOnly from "../components/common/input-type/read-only/input-relational-n-to-n-read-only";
import InputRelationalReadOnly from "../components/common/input-type/read-only/input-relational-read-only";
import InputBlob from "../components/common/input-type/input-blob";
import InputText from "../components/common/input-type/input-text";
import InputTextReadOnly from "../components/common/input-type/read-only/input-text-read-only";
import InputTextarea from "../components/common/input-type/input-textarea";
import SearchInputDate from "../components/common/search-input/search-input-date";
import SearchInputDateTime from "../components/common/search-input/search-input-date-time";
import SearchInputDropdown from "../components/common/search-input/search-input-dropdown";
import SearchInputDropdownSearch from "../components/common/search-input/search-input-dropdown-search";
import SearchInputEnum from "../components/common/search-input/search-input-enum";
import SearchInputEnumSearchable from "../components/common/search-input/search-input-enum-searchable";
import SearchInputFloat from "../components/common/search-input/search-input-float";
import SearchInputNativeDate from "../components/common/search-input/search-input-native-date";
import SearchInputNativeDateTime from "../components/common/search-input/search-input-native-date-time";
import SearchInputNativeTime from "../components/common/search-input/search-input-native-time";
import SearchInputNumeric from "../components/common/search-input/search-input-numeric";
import SearchInputRelationalNativeSearch from "../components/common/search-input/search-input-relational-native-search";
import SearchInputRelationalSearch from "../components/common/search-input/search-input-relational-search";
import SearchInputText from "../components/common/search-input/search-input-text";
import InputTextEditor from "../components/common/input-type/input-text-editor";
import InputUpload from "../components/common/input-type/input-upload";
import InputDependedRelational from "../components/common/input-type/input-depended-relational";
import InputUploadMultiple from "../components/common/input-type/input-upload-multiple";
import InputUploadOneReadOnly from "../components/common/input-type/read-only/input-upload-one-read-only";
import InputUploadMultipleReadOnly from "../components/common/input-type/read-only/input-upload-multiple-read-only";
import InputDynamicRelational from "../components/common/input-type/input-dynamic-relational";
import SearchInputDynamicSelect from "../components/common/search-input/search-input-dynamic-select";
import InputDynamicRelationalReadOnly from "../components/common/input-type/read-only/input-dynamic-relational-read-only";
import InputBackendCallbackReadOnly from "../components/common/input-type/read-only/input-backend-callback-read-only";

const RANDOM_DATE = "2022-03-29";
const DATE_DEFAULT_OPTIONS = {
  timeZone: "UTC",
};

let indexedPermittedValues = {};

const VALID_SQL_TIME_REGEX = /^[0-2]\d:[0-5]\d:[0-5]\d$/;
export const VALID_SQL_DATE_REGEX = /^\d{1,4}-[0-1]\d-[0-3]\d$/;
export const VALID_SQL_DATE_TIME_REGEX =
  /^\d{1,4}-[0-1]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d$/;
const VALID_COLOR = /^#\w{6}$/;

const relationNtoNDatagridFormat = ({
  name,
  value,
  className,
  id,
  permittedValues,
}) => {
  if (!indexedPermittedValues[name]) {
    indexedPermittedValues[name] = {};
    permittedValues.forEach((option) => {
      indexedPermittedValues[name][option.id] = option.title;
    });
  }

  return (
    <InputRelationalNtoNReadOnly
      {...{
        value,
        className,
        id,
        indexedPermittedValues: indexedPermittedValues[name],
      }}
    />
  );
};

const componentMapping = {
  [fieldTypes.BACKEND_CALLBACK]: InputBackendCallback,
  [fieldTypes.BLOB]: InputBlob,
  [fieldTypes.COLOR]: InputColor,
  [fieldTypes.DATETIME]: InputDateTime,
  [fieldTypes.DATE]: InputDate,
  [fieldTypes.DEPENDED_RELATIONAL]: InputDependedRelational,
  [fieldTypes.DYNAMIC_RELATION]: InputDynamicRelational,
  [fieldTypes.DROPDOWN]: InputDropdown,
  [fieldTypes.DROPDOWN_SEARCH]: InputDropdownSearch,
  [fieldTypes.EMAIL]: InputEmail,
  [fieldTypes.ENUM]: InputEnum,
  [fieldTypes.ENUM_SEARCHABLE]: InputEnumSearchable,
  [fieldTypes.FLOAT]: InputFloat,
  [fieldTypes.HIDDEN]: InputHidden,
  [fieldTypes.INTEGER]: InputNumeric,
  [fieldTypes.MULTISELECT_NATIVE]: InputMultiselectNative,
  [fieldTypes.MULTISELECT_SEARCHABLE]: InputMultiselectSearchable,
  [fieldTypes.NATIVE_DATETIME]: InputNativeDateTime,
  [fieldTypes.NATIVE_DATE]: InputNativeDate,
  [fieldTypes.NATIVE_TIMESTAMP]: InputNativeDateTime,
  [fieldTypes.NATIVE_TIME]: InputNativeTime,
  [fieldTypes.NUMERIC]: InputNumeric,
  [fieldTypes.PASSWORD]: InputPassword,
  [fieldTypes.RELATIONAL]: InputRelational,
  [fieldTypes.RELATIONAL_NATIVE]: InputRelationalNative,
  [fieldTypes.RELATIONAL_N_N]: InputRelationalNtoN,
  [fieldTypes.RELATIONAL_N_N_NATIVE]: InputRelationalNativeNtoN,
  [fieldTypes.TEXTAREA]: InputTextarea,
  [fieldTypes.TEXT]: InputText,
  [fieldTypes.TEXT_EDITOR]: InputTextEditor,
  [fieldTypes.TIMESTAMP]: InputDateTime,
  [fieldTypes.UPLOAD]: InputUpload,
  [fieldTypes.UPLOAD_MULTIPLE]: InputUploadMultiple,
};

const searchInputComponentMapping = {
  [fieldTypes.DATETIME]: SearchInputDateTime,
  [fieldTypes.DATE]: SearchInputDate,
  [fieldTypes.DEPENDED_RELATIONAL]: SearchInputDynamicSelect,
  [fieldTypes.DROPDOWN]: SearchInputDropdown,
  [fieldTypes.DROPDOWN_SEARCH]: SearchInputDropdownSearch,
  [fieldTypes.DYNAMIC_RELATION]: SearchInputDynamicSelect,
  [fieldTypes.ENUM]: SearchInputEnum,
  [fieldTypes.ENUM_SEARCHABLE]: SearchInputEnumSearchable,
  [fieldTypes.FLOAT]: SearchInputFloat,
  [fieldTypes.INTEGER]: SearchInputNumeric,
  [fieldTypes.MULTISELECT_NATIVE]: SearchInputDropdown,
  [fieldTypes.MULTISELECT_SEARCHABLE]: SearchInputDropdownSearch,
  [fieldTypes.NATIVE_DATETIME]: SearchInputNativeDateTime,
  [fieldTypes.NATIVE_DATE]: SearchInputNativeDate,
  [fieldTypes.NATIVE_TIMESTAMP]: SearchInputNativeDateTime,
  [fieldTypes.NATIVE_TIME]: SearchInputNativeTime,
  [fieldTypes.NUMERIC]: SearchInputNumeric,
  [fieldTypes.RELATIONAL]: SearchInputRelationalSearch,
  [fieldTypes.RELATIONAL_NATIVE]: SearchInputRelationalNativeSearch,
  [fieldTypes.RELATIONAL_N_N]: SearchInputRelationalSearch,
  [fieldTypes.RELATIONAL_N_N_NATIVE]: SearchInputRelationalNativeSearch,
  [fieldTypes.TEXT]: SearchInputText,
  [fieldTypes.TIMESTAMP]: SearchInputDate,
};

const readOnlyComponentMapping = {
  [fieldTypes.BACKEND_CALLBACK]: InputBackendCallbackReadOnly,
  [fieldTypes.BLOB]: InputBlobReadOnly,
  [fieldTypes.COLOR]: InputColorReadOnly,
  [fieldTypes.DATETIME]: InputDateTimeReadOnly,
  [fieldTypes.DATE]: InputDateReadOnly,
  [fieldTypes.DROPDOWN]: InputDropdownReadOnly,
  [fieldTypes.DROPDOWN_SEARCH]: InputDropdownReadOnly,
  [fieldTypes.DYNAMIC_RELATION]: InputDynamicRelationalReadOnly,
  [fieldTypes.FLOAT]: InputFloatReadOnly,
  [fieldTypes.HIDDEN]: InputHidden,
  [fieldTypes.INTEGER]: InputTextReadOnly,
  [fieldTypes.MULTISELECT_NATIVE]: InputMultiselectReadOnly,
  [fieldTypes.MULTISELECT_SEARCHABLE]: InputMultiselectReadOnly,
  [fieldTypes.NATIVE_DATETIME]: InputNativeDateTimeReadOnly,
  [fieldTypes.NATIVE_DATE]: InputNativeDateReadOnly,
  [fieldTypes.NATIVE_TIME]: InputNativeTimeReadOnly,
  [fieldTypes.NUMERIC]: InputTextReadOnly,
  [fieldTypes.RELATIONAL]: InputRelationalReadOnly,
  [fieldTypes.RELATIONAL_NATIVE]: InputRelationalReadOnly,
  [fieldTypes.RELATIONAL_N_N]: relationNtoNDatagridFormat,
  [fieldTypes.RELATIONAL_N_N_NATIVE]: relationNtoNDatagridFormat,
  [fieldTypes.TEXT]: InputTextReadOnly,
  [fieldTypes.TIMESTAMP]: InputDateTimeReadOnly,
  [fieldTypes.TIMESTAMP]: InputNativeDateTimeReadOnly,
  [fieldTypes.UPLOAD]: InputUploadOneReadOnly,
  [fieldTypes.UPLOAD_MULTIPLE]: InputUploadMultipleReadOnly,
};

const jssNameDataTypeMapping = {
  [fieldTypes.DROPDOWN]: "form-select",
  [fieldTypes.DROPDOWN_SEARCH]: "form-select-search",
  [fieldTypes.ENUM]: "form-select",
  [fieldTypes.ENUM_SEARCHABLE]: "form-select-search",
  [fieldTypes.MULTISELECT_NATIVE]: "form-select",
  [fieldTypes.MULTISELECT_SEARCHABLE]: "form-select-search",
  [fieldTypes.RELATIONAL]: "form-select-search",
  [fieldTypes.DEPENDED_RELATIONAL]: "form-select-search",
  [fieldTypes.DYNAMIC_RELATION]: "form-select-search",
  [fieldTypes.RELATIONAL_NATIVE]: "form-select",
  [fieldTypes.TEXT]: "form-input",
  [fieldTypes.TEXTAREA]: "form-textarea",
  [fieldTypes.HIDDEN]: "form-input-hidden",
  [fieldTypes.RELATIONAL_N_N]: "form-select-search",
  [fieldTypes.RELATIONAL_N_N_NATIVE]: "form-select",
};

const jssNameDataTypeReadOnlyMapping = {
  [fieldTypes.TEXT]: "form-input-read-only",
};

const forceSearchDataTypeMapping = {
  [fieldTypes.DEPENDED_RELATIONAL]: true,
  [fieldTypes.DROPDOWN]: true,
  [fieldTypes.DROPDOWN_SEARCH]: true,
  [fieldTypes.DYNAMIC_RELATION]: true,
  [fieldTypes.ENUM]: true,
  [fieldTypes.ENUM_SEARCHABLE]: true,
  [fieldTypes.MULTISELECT_NATIVE]: true,
  [fieldTypes.MULTISELECT_SEARCHABLE]: true,
  [fieldTypes.RELATIONAL]: true,
  [fieldTypes.RELATIONAL_NATIVE]: true,
  [fieldTypes.RELATIONAL_N_N]: true,
  [fieldTypes.RELATIONAL_N_N_NATIVE]: true,
  [fieldTypes.TEXT]: false,
};

export const formatDate = (dateValue, locale) => {
  return VALID_SQL_DATE_REGEX.test(dateValue)
    ? new Date(dateValue).toLocaleDateString(locale, DATE_DEFAULT_OPTIONS)
    : "";
};

export const formatTime = (dateValue, locale) => {
  if (VALID_SQL_TIME_REGEX.test(dateValue)) {
    const currentDate = new Date(`${RANDOM_DATE} ${dateValue}Z`);
    return currentDate.toLocaleTimeString(locale, DATE_DEFAULT_OPTIONS);
  }

  return "";
};

export const formatDateTime = (dateValue, locale) => {
  if (VALID_SQL_DATE_TIME_REGEX.test(dateValue)) {
    const currentDate = new Date(`${dateValue}Z`);
    return (
      currentDate.toLocaleDateString(locale, DATE_DEFAULT_OPTIONS) +
      ", " +
      currentDate.toLocaleTimeString(locale, DATE_DEFAULT_OPTIONS)
    );
  }

  return "";
};

/**
 * Returns either a valid HEX color, either null
 *
 * @returns {string|null}
 * @param colorValue color value must be a valid HEX color (e.g. #00FF34)
 */
export const formatColor = (colorValue) => {
  return VALID_COLOR.test(colorValue) ? colorValue : null;
};

export const memoFormatColor = memoizeOne(formatColor);

export const getJssNameFromType = (dataType, readOnly) => {
  if (readOnly && jssNameDataTypeReadOnlyMapping[dataType]) {
    return jssNameDataTypeReadOnlyMapping[dataType];
  } else if (!readOnly && jssNameDataTypeMapping[dataType]) {
    return jssNameDataTypeMapping[dataType];
  }

  // If we can't find the data type then fallback on text
  if (readOnly) {
    return jssNameDataTypeReadOnlyMapping["varchar"];
  } else {
    return jssNameDataTypeMapping["varchar"];
  }
};

// Creating a function to return the input component as we would like to have the more optimized solution
// to get the input component the fastest possible
export const getComponentFromDataType = ({ dataType, readOnly }) => {
  if (readOnly && readOnlyComponentMapping[dataType]) {
    return readOnlyComponentMapping[dataType];
  } else if (!readOnly && componentMapping[dataType]) {
    return componentMapping[dataType];
  }

  // If we can't find the data type then fallback on text
  if (readOnly) {
    return InputTextReadOnly;
  } else {
    return InputText;
  }
};

export const getMountingCallbacks = ({
  formState,
  configurationSettings,
  dataType,
  fieldName,
}) => {
  let onMount = () => {};
  let onUnmount = () => {};

  if (dataType === fieldTypes.BACKEND_CALLBACK) {
    // formState comes in the type 'form/edit', 'form/clone',... e.t.c.
    // so we are trying to convert them from 'form/edit' to 'editFields'
    const stateType = formState.replace("form/", "") + "Fields";
    if (configurationSettings[stateType]) {
      const fieldCallbacks = configurationSettings[stateType].find(
        (field) => field.fieldName === fieldName
      );

      if (fieldCallbacks) {
        onMount = fieldCallbacks.onMount;
        onUnmount = fieldCallbacks.onUnmount;
      }
    }
  }

  return {
    onMount,
    onUnmount,
  };
};

export const getSearchInputComponent = (dataType) => {
  if (searchInputComponentMapping[dataType]) {
    return searchInputComponentMapping[dataType];
  }
  return SearchInputText;
};

export const requireForceSearchOnChange = (dataType) => {
  if (forceSearchDataTypeMapping[dataType]) {
    return forceSearchDataTypeMapping[dataType];
  }
  return false;
};
