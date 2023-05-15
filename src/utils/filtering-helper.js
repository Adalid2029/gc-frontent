import TextSelectOptions from "../components/filtering/select-options/text";
import SelectOptionsEqualNotEqual from "../components/filtering/select-options/equal_not_equal";
import ComparisonSelectOptions from "../components/filtering/select-options/comparison";
import SelectOptionsHasOrNot from "../components/filtering/select-options/has_or_not";
import { fieldTypes } from "../constants/field-types";

export const emptyFilterMapping = {
  is_empty: true,
  is_not_empty: true,
};

const {
  BACKEND_CALLBACK,
  COLOR,
  DATE,
  DATETIME,
  DEPENDED_RELATIONAL,
  DROPDOWN,
  DROPDOWN_SEARCH,
  DYNAMIC_RELATION,
  ENUM,
  ENUM_SEARCHABLE,
  INTEGER,
  MULTISELECT_NATIVE,
  MULTISELECT_SEARCHABLE,
  NATIVE_DATE,
  NATIVE_DATETIME,
  NATIVE_TIME,
  NATIVE_TIMESTAMP,
  NUMERIC,
  RELATIONAL,
  RELATIONAL_NATIVE,
  RELATIONAL_N_N,
  RELATIONAL_N_N_NATIVE,
  TEXT,
  TIME,
  TIMESTAMP,
} = fieldTypes;

const fieldTypesAlwaysToRefreshMapping = {
  [DEPENDED_RELATIONAL]: true,
  [DROPDOWN]: true,
  [DROPDOWN_SEARCH]: true,
  [ENUM]: true,
  [ENUM_SEARCHABLE]: true,
  [RELATIONAL]: true,
  [RELATIONAL_NATIVE]: true,
  [RELATIONAL_N_N]: true,
  [RELATIONAL_N_N_NATIVE]: true,
};

const comparisonValueMapping = {
  [BACKEND_CALLBACK]: "contains",
  [COLOR]: "contains",
  [DATETIME]: "equals",
  [DATE]: "equals",
  [DEPENDED_RELATIONAL]: "equals",
  [DROPDOWN]: "equals",
  [DROPDOWN_SEARCH]: "equals",
  [DYNAMIC_RELATION]: "equals",
  [ENUM]: "equals",
  [ENUM_SEARCHABLE]: "equals",
  [INTEGER]: "equals",
  [MULTISELECT_NATIVE]: "has",
  [MULTISELECT_SEARCHABLE]: "has",
  [NATIVE_DATETIME]: "equals",
  [NATIVE_DATE]: "equals",
  [NATIVE_TIMESTAMP]: "equals",
  [NATIVE_TIME]: "equals",
  [NUMERIC]: "equals",
  [RELATIONAL]: "equals",
  [RELATIONAL_NATIVE]: "equals",
  [RELATIONAL_N_N]: "has",
  [RELATIONAL_N_N_NATIVE]: "has",
  [TEXT]: "contains",
  [TIMESTAMP]: "equals",
  [TIME]: "equals",
};

const selectOptionsComponentMapping = {
  [BACKEND_CALLBACK]: TextSelectOptions,
  [COLOR]: SelectOptionsEqualNotEqual,
  [DATETIME]: ComparisonSelectOptions,
  [DATE]: ComparisonSelectOptions,
  [DROPDOWN]: SelectOptionsEqualNotEqual,
  [DROPDOWN_SEARCH]: SelectOptionsEqualNotEqual,
  [ENUM]: SelectOptionsEqualNotEqual,
  [ENUM_SEARCHABLE]: SelectOptionsEqualNotEqual,
  [INTEGER]: ComparisonSelectOptions,
  [MULTISELECT_NATIVE]: SelectOptionsHasOrNot,
  [MULTISELECT_SEARCHABLE]: SelectOptionsHasOrNot,
  [NATIVE_DATETIME]: ComparisonSelectOptions,
  [NATIVE_DATE]: ComparisonSelectOptions,
  [NATIVE_TIMESTAMP]: ComparisonSelectOptions,
  [NATIVE_TIME]: ComparisonSelectOptions,
  [NUMERIC]: ComparisonSelectOptions,
  [RELATIONAL]: SelectOptionsEqualNotEqual,
  [RELATIONAL_NATIVE]: SelectOptionsEqualNotEqual,
  [RELATIONAL_N_N]: SelectOptionsHasOrNot,
  [RELATIONAL_N_N_NATIVE]: SelectOptionsHasOrNot,
  [TEXT]: TextSelectOptions,
  [TIMESTAMP]: ComparisonSelectOptions,
  [TIME]: ComparisonSelectOptions,
};

export const getSelectOptionsComponentFromDataType = (dataType) => {
  if (selectOptionsComponentMapping[dataType]) {
    return selectOptionsComponentMapping[dataType];
  }
  return TextSelectOptions;
};

export function getFilterValueFromDataType(dataType) {
  if (comparisonValueMapping[dataType]) {
    return comparisonValueMapping[dataType];
  }

  return comparisonValueMapping["varchar"];
}

/**
 *
 * @param string oldDataType
 * @param string newDataType
 * @returns {boolean}
 */
export function doTriggerFilterRefresh(oldDataType, newDataType) {
  if (fieldTypesAlwaysToRefreshMapping[newDataType]) {
    return true;
  }

  return oldDataType !== newDataType;
}

/**
 *
 * @param string oldValue
 * @param string newValue
 * @returns {boolean}
 */
export function doTriggerFilterValueRefresh(oldValue, newValue) {
  // trigger only when we have different values of an empty or non-empty filter value
  return emptyFilterMapping[oldValue] !== emptyFilterMapping[newValue];
}

/**
 *
 * @param array data
 * @returns {*[]}
 */
export function transformExtendedSearchData(data) {
  let transformedData = [];
  data.forEach((searchData) => {
    transformedData.push({
      ...searchData,
      value:
        typeof searchData.value === "object" && searchData.value !== null
          ? searchData.value.key
          : searchData.value,
    });
  });
  return transformedData;
}
