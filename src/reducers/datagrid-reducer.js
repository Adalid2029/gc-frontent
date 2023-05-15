import { datagridActions } from "../actions/datagrid-actions";
import { configurationActions } from "../actions/configuration-actions";
import { columnsActions } from "../actions/columns-actions";
import { filteringActions } from "../actions/filtering-actions";
import { handleActions } from "../utils/redux-helper";
import { formActions } from "../actions/form-actions";
import { simpleReorder } from "../utils/array-helper";
import { fieldTypesGroupingPerOperation } from "../utils/form-fields";
import { getColumnsWithData } from "../utils/columns";

const initialState = {
  columnSearchValues: {},
  columnSearchValuesDisplayAs: {},
  extendedSearchData: [],
  extendedSearchOperator: null,
  filteredTotalEntries: 0,
  lastPage: 1,
  orderBy: "",
  page: 1,
  perPage: 10,
  sorting: "",
  sortingFor: "",
  totalEntries: 0,
  visibleColumns: [],
  orderedColumns: [],
  lastPrimaryKeyValue: null,
};

const cleanFilteringState = {
  columnSearchValues: {},
  columnSearchValuesDisplayAs: {},
  extendedSearchData: [],
  extendedSearchOperator: null,
  page: 1,
};

const cleanOrderingState = {
  sorting: "",
  sortingFor: "",
  page: 1,
};

const clearLastPrimaryKeyValue = (state) => {
  return {
    ...state,
    lastPrimaryKeyValue: null,
  };
};

const resetOrderedColumns = (columns) => {
  let orderedColumns = [];

  columns.forEach((column) => {
    orderedColumns.push(column.name);
  });

  return orderedColumns;
};

const datagridReducer = handleActions(
  {
    [configurationActions.INIT_SUCCESS]: (state, action) => {
      const { columns } = action.data;

      const groupedFieldTypes = fieldTypesGroupingPerOperation(action.data);

      return {
        ...state,
        // As visible and ordered columns is a user behavior, show us the default visible columns only when
        // we don't already have visible columns fields into our state
        visibleColumns:
          state.visibleColumns.length === 0
            ? getColumnsWithData(
                columns,
                groupedFieldTypes.fieldTypesColumns
              ).map((column) => column.name)
            : state.visibleColumns,
        orderedColumns:
          state.orderedColumns.length === 0
            ? getColumnsWithData(
                columns,
                groupedFieldTypes.fieldTypesColumns
              ).map((column) => column.name)
            : state.orderedColumns,
      };
    },

    [columnsActions.SELECT_ALL_OR_NONE]: (state, action) => {
      const { columns } = action;
      const { visibleColumns } = state;

      // All the columns are selected hence we have a toggle of that
      if (columns.length === visibleColumns.length) {
        return {
          ...state,
          visibleColumns: [],
        };
      }

      return {
        ...state,
        visibleColumns: columns.map((column) => column.name),
      };
    },

    [columnsActions.TOGGLE_VISIBLE_COLUMN]: (state, action) => {
      const { columnName, columns } = action;
      const { visibleColumns } = state;

      const orderedColumns = columns.map((column) => column.name);
      let transformedVisibleColumns = [];

      if (visibleColumns.includes(columnName)) {
        transformedVisibleColumns = visibleColumns.filter(
          (column) => column !== columnName
        );
      } else {
        // We need to have the correct order for the new transformed columns
        orderedColumns.forEach((orderedColumnName) => {
          if (
            visibleColumns.includes(orderedColumnName) ||
            orderedColumnName === columnName
          ) {
            transformedVisibleColumns.push(orderedColumnName);
          }
        });
      }

      return {
        ...state,
        visibleColumns: transformedVisibleColumns,
      };
    },

    [columnsActions.ORDERING_CHANGE]: (state, action) => {
      const { orderedColumns } = state;
      const { sourceIndex, destinationIndex, columnName } = action;

      // Just a double check that we are going to reorder the right column!
      // If not, then do nothing!
      if (orderedColumns[sourceIndex] !== columnName) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        orderedColumns: simpleReorder(
          orderedColumns,
          sourceIndex,
          destinationIndex
        ),
      };
    },
    [columnsActions.RESET_ORDERING]: (state, action) => {
      const { columns } = action;

      const orderedColumns = resetOrderedColumns(columns);

      return {
        ...state,
        orderedColumns,
      };
    },

    [datagridActions.REHYDRATE_VALIDATION]: (state) => {
      let filteredState = {};
      Object.keys(initialState).forEach((keyName) => {
        filteredState[keyName] =
          state[keyName] !== undefined ? state[keyName] : initialState[keyName];
      });
      return filteredState;
    },

    [datagridActions.COLUMN_SEARCH]: (state, action) => {
      if (action.searchValue) {
        return {
          ...state,
          columnSearchValues: {
            ...state.columnSearchValues,
            [action.columnName]: action.searchValue,
          },
          columnSearchValuesDisplayAs: {
            ...state.columnSearchValuesDisplayAs,
            ...(action.searchValueDisplayAs
              ? {
                  [action.columnName]: action.searchValueDisplayAs,
                }
              : null),
          },
        };
      } else if (state.columnSearchValues[action.columnName] !== undefined) {
        // If we have an empty search value and we already have
        // defined the fieldName, remove it from search
        // (empty values on quick search shouldn't search for
        // an empty value)
        delete state.columnSearchValues[action.columnName];

        return {
          ...state,
          columnSearchValues: {
            ...state.columnSearchValues,
          },
        };
      }
      // Fallback
      return {
        ...state,
      };
    },

    [datagridActions.DATA_RENDER]: (state, action) => {
      const { filtered_total: filteredTotalEntries } = action.data;
      const totalEntries =
        filteredTotalEntries > state.totalEntries
          ? filteredTotalEntries
          : state.totalEntries;
      const lastPage =
        filteredTotalEntries === 0
          ? 1
          : Math.ceil(filteredTotalEntries / state.perPage);
      const page = state.page > lastPage ? lastPage : state.page;

      const lastPrimaryKeyValue = action.lastPrimaryKeyValue
        ? action.lastPrimaryKeyValue
        : null;

      return {
        ...state,
        filteredTotalEntries,
        totalEntries,
        lastPage,
        page,
        lastPrimaryKeyValue,
      };
    },
    [datagridActions.PER_PAGE_CHANGE]: (state, action) => {
      return {
        ...state,
        perPage: action.perPageValue,
        page: 1,
      };
    },

    [datagridActions.PAGE_CHANGE]: (state, action) => {
      return {
        ...state,
        page: action.pageValue,
      };
    },

    [datagridActions.COLUMN_ORDERING]: (state, action) => {
      return {
        ...state,
        sorting: action.sorting,
        sortingFor: action.columnName,
      };
    },
    [datagridActions.ORDERING_RESET]: (state) => {
      return {
        ...state,
        ...cleanOrderingState,
      };
    },
    [datagridActions.CLEAR_FILTERING]: (state) => {
      return {
        ...state,
        ...cleanFilteringState,
      };
    },
    [datagridActions.CLEAR_CACHE]: (state) => {
      return {
        ...state,
        ...cleanFilteringState,
        ...cleanOrderingState,
      };
    },

    [filteringActions.FORM_SUBMIT]: (state, action) => {
      return {
        ...state,
        columnSearchValues: {},
        columnSearchValuesDisplayAs: {},
        extendedSearchData: action.data["extended_search"],
        extendedSearchOperator: action.data["basic_operator"],
      };
    },

    [formActions.ADD]: clearLastPrimaryKeyValue,
    [formActions.CLONE]: clearLastPrimaryKeyValue,
    [formActions.EDIT]: clearLastPrimaryKeyValue,
    [formActions.READ]: clearLastPrimaryKeyValue,
  },
  {
    ...initialState,
  }
);

export default datagridReducer;
