import memoizeOne from "memoize-one";
import isDeepEqual from "lodash/isEqual";

const visibleColumnsWithDetails = (
  columnsWithDetails,
  visibleColumns,
  orderedColumns
) => {
  if (!columnsWithDetails || !visibleColumns || !orderedColumns) {
    return [];
  }
  let detailedColumns = [];
  orderedColumns.forEach((columnName) => {
    // We are only returning the visible columns
    if (!visibleColumns.includes(columnName)) {
      return true;
    }

    const detailedColumn = columnsWithDetails.find(
      (column) => column.name === columnName
    );

    if (detailedColumn) {
      detailedColumns.push(detailedColumn);
    }
  });

  return detailedColumns;
};

const memoVisibleColumnsWithDetails = memoizeOne(
  visibleColumnsWithDetails,
  isDeepEqual
);

export const getVisibleColumnsWithDetails = (
  columnsWithDetails,
  visibleColumns,
  orderedColumns
) => {
  return memoVisibleColumnsWithDetails(
    columnsWithDetails,
    visibleColumns,
    orderedColumns
  );
};

const transformVisibleColumnsToShortString = (columns, visibleColumns) => {
  if (!columns || !visibleColumns) {
    return "";
  }
  let visibleColumnsIndexes = [];
  columns.forEach((column, columnIndex) => {
    if (
      visibleColumns.find((visibleColumn) => visibleColumn === column.name) !==
      undefined
    ) {
      visibleColumnsIndexes.push(columnIndex);
    }
  });

  return visibleColumnsIndexes.join("|");
};

const memoGetVisibleColumnsAsShortString = memoizeOne(
  transformVisibleColumnsToShortString,
  isDeepEqual
);

export const getVisibleColumnsAsShortString = (columns, visibleColumns) => {
  return memoGetVisibleColumnsAsShortString(columns, visibleColumns);
};

export const getColumnsWithData = (columns, fieldTypes) => {
  return columns
    .map((column) => {
      const columnData = fieldTypes.find(
        (columnData) => columnData.fieldName === column.name
      );
      return {
        ...column,
        ...columnData,
      };
    })
    .filter((column) => column.dataType !== fieldTypes.INVISIBLE);
};
