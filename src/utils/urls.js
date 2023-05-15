import memoizeOne from "memoize-one";
import isDeepEqual from "lodash/isEqual";
import { formActions } from "../actions/form-actions";
import { configurationActions } from "../actions/configuration-actions";

const encodeDataObjectToArrayOfGetParameters = (data) => {
  const finalUrlAsArray = [];
  Object.keys(data).forEach((queryParameter) => {
    if (
      typeof data[queryParameter] === "object" &&
      data[queryParameter] !== null
    ) {
      Object.keys(data[queryParameter]).forEach((subQueryParameter) => {
        // TODO: Refactor those multi-level arrays to a single level loop with a function as it is
        //       very difficult to read or change the code
        if (
          typeof data[queryParameter][subQueryParameter] === "object" &&
          data[queryParameter][subQueryParameter] !== null
        ) {
          Object.keys(data[queryParameter][subQueryParameter]).forEach(
            (subSubQueryParameter) => {
              let value =
                data[queryParameter][subQueryParameter][subSubQueryParameter];
              let name = `${queryParameter}[${subQueryParameter}][${subSubQueryParameter}]`;

              if (
                typeof value === "object" &&
                value !== null &&
                value.key !== undefined
              ) {
                // TODO: We need to remove this tech debt
                value = encodeURIComponent(value.key);
              } else {
                value = encodeURIComponent(value);
              }

              finalUrlAsArray.push(`${name}=${value}`);
            }
          );
        } else {
          finalUrlAsArray.push(
            queryParameter +
              "[" +
              subQueryParameter +
              "]=" +
              encodeURIComponent(data[queryParameter][subQueryParameter])
          );
        }
      });
    } else {
      finalUrlAsArray.push(
        encodeURIComponent(queryParameter) +
          "=" +
          encodeURIComponent(data[queryParameter]).replace(/%7C/g, "|")
      );
    }
  });
  return finalUrlAsArray;
};

function encodeQueryData(data) {
  return encodeDataObjectToArrayOfGetParameters(data).join("&");
}

const urlGenerator = (
  actionUrlSegment,
  {
    apiUrl,
    columnSearchValues,
    sorting,
    sortingFor,
    visibleColumnsAsShortString,
    extendedSearchData,
  }
) => {
  let data = {
    action: actionUrlSegment,
    order_by: sortingFor,
    sorting,
    visible_columns: visibleColumnsAsShortString,
  };

  // We can't have both extended search data and quick column search at the same time
  if (extendedSearchData.length > 0) {
    data.extended_search = extendedSearchData;
  } else {
    data.search = columnSearchValues;
  }

  const queryData = encodeQueryData(data);

  return `${apiUrl}?${queryData}`;
};

const pdfExportUrlGenerator = (state) => {
  return urlGenerator("export-pdf", state);
};

const excelExportUrlGenerator = (state) => {
  return urlGenerator("export", state);
};

const printUrlGenerator = (state) => {
  return urlGenerator("print", state);
};

const memoPdfExportUrlGenerator = memoizeOne(
  pdfExportUrlGenerator,
  isDeepEqual
);
const memoExcelExportUrlGenerator = memoizeOne(
  excelExportUrlGenerator,
  isDeepEqual
);
const memoPrintUrlGenerator = memoizeOne(printUrlGenerator, isDeepEqual);

export const pdfExportUrl = (state) => {
  return memoPdfExportUrlGenerator(state);
};

export const excelExportUrl = (state) => {
  return memoExcelExportUrlGenerator(state);
};

export const printUrl = (state) => {
  return memoPrintUrlGenerator(state);
};

const getPrimaryKeyValueFromUrlString = (url) => {
  return url.match(/\d+$/).slice(-1).pop();
};

export const getReduxActionFromUrl = () => {
  const currentUrl = window.location.href;

  let type = null;
  let primaryKeyValue = null;

  if (/\/add$/.test(currentUrl)) {
    type = formActions.ADD;
  } else if (/\/edit\/\d+$/.test(currentUrl)) {
    type = formActions.EDIT;
    primaryKeyValue = getPrimaryKeyValueFromUrlString(currentUrl);
  } else if (/\/clone\/\d+$/.test(currentUrl)) {
    type = formActions.CLONE;
    primaryKeyValue = getPrimaryKeyValueFromUrlString(currentUrl);
  } else if (/\/read\/\d+$/.test(currentUrl)) {
    type = formActions.READ;
    primaryKeyValue = getPrimaryKeyValueFromUrlString(currentUrl);
  }

  return {
    type,
    ...(primaryKeyValue !== null ? { primaryKeyValue } : {}),
    reason: configurationActions.INIT_SUCCESS,
  };
};

export const getBlobViewUrl = ({ apiUrl, fieldName, primaryKeyValue } = {}) => {
  return `${apiUrl}?action=blob-view&field_name=${fieldName}&pk_value=${primaryKeyValue}`;
};

export const getUploadOneViewUrl = ({ fieldOptions = {}, filename }) => {
  return fieldOptions.publicPath ? `${fieldOptions.publicPath}${filename}` : "";
};

export const getMultipleActionUrl = ({ button, selectedIds }) => {
  return (
    button.url +
    button.querySeparator +
    selectedIds
      .map((selectedId) => `${button.idFieldQueryName}[]=${selectedId}`)
      .join("&")
  );
};
