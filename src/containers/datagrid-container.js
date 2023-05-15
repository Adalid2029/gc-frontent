import { connect } from "react-redux";
import { PURGE } from "redux-persist";
import PropTypes from "prop-types";
import Datagrid from "../components/datagrid/datagrid";
import { datagridActions } from "../actions/datagrid-actions";
import { formActions } from "../actions/form-actions";
import { toolsActions } from "../actions/tools-actions";
import { filteringActions } from "../actions/filtering-actions";
import {
  getVisibleColumnsAsShortString,
  getVisibleColumnsWithDetails,
} from "../utils/columns";

const mapStateToProps = (state, ownProps) => ({
  // from state
  backendActionButtonsMultiple:
    state.configuration.backendActionButtonsMultiple,
  columnSearchValues: state.datagrid.columnSearchValues,
  columnSearchValuesDisplayAs: state.datagrid.columnSearchValuesDisplayAs,
  filteredTotalEntries: state.datagrid.filteredTotalEntries,
  hasActions: state.configuration.hasActions,
  hasAdd: state.configuration.hasAdd,
  initError: state.configuration.initError,
  lastPage: state.datagrid.lastPage,
  loading: state.loading,
  maxActionButtons: state.configuration.maxActionButtons,
  options: state.configuration.options,
  page: state.datagrid.page,
  pagingLoading: state.configuration.pagingLoading,
  pagingOptions: state.configuration.pagingOptions,
  perPage: state.datagrid.perPage,
  rows: state.datagridRows,
  sorting: state.datagrid.sorting,
  sortingFor: state.datagrid.sortingFor,
  subject: state.configuration.subject,
  totalEntries: state.datagrid.totalEntries,
  lastPrimaryKeyValue: state.datagrid.lastPrimaryKeyValue,
  visibleColumns: getVisibleColumnsWithDetails(
    state.configuration.columns,
    state.datagrid.visibleColumns,
    state.datagrid.orderedColumns
  ),
  visibleColumnsAsShortString: getVisibleColumnsAsShortString(
    state.configuration.columns,
    state.datagrid.visibleColumns
  ),
  apiUrl: state.configuration.apiUrl,
  extendedSearchData: state.datagrid.extendedSearchData,
  selectedIds: state.configuration.selectedIds,
  selectRowsAllOrNoneChecked:
    state.configuration.selectedIds.length > 0 &&
    state.configuration.selectedIds.length >= state.datagridRows.length,

  // from own props
  DatagridBody: ownProps.DatagridBody,
  DatagridCheckbox: ownProps.DatagridCheckbox,
  DatagridFooter: ownProps.DatagridFooter,
  DatagridHeader: ownProps.DatagridHeader,
  DatagridTitle: ownProps.DatagridTitle,
  DatagridWrapper: ownProps.DatagridWrapper,
  GroupButtons: ownProps.GroupButtons,
  isMobileDevice: ownProps.isMobileDevice,
  loadCssThirdParty: ownProps.loadCssThirdParty,
  configurationSettings: ownProps.configurationSettings,
  settings: ownProps.settings,
  title: ownProps.title,
  skin: ownProps.skin,
  theme: ownProps.theme,
});

const mapDispatchToProps = (dispatch) => {
  // Dispatching a page change only when there is an actual change
  const pageChangeDispatch = (currentPage, pageValue, lastPage) => {
    if (currentPage !== pageValue && pageValue <= lastPage && pageValue >= 1) {
      dispatch({
        type: datagridActions.PAGE_CHANGE,
        pageValue: pageValue,
      });
    }
  };

  return {
    onFilteringModalOpen: () =>
      dispatch({
        type: filteringActions.MODAL_OPEN,
      }),
    onSelectRowToggle: ({ rowId }) =>
      dispatch({
        type: datagridActions.SELECT_ROW_TOGGLE,
        rowId,
      }),
    onSelectRowAllOrNone: () =>
      dispatch({
        type: datagridActions.SELECT_ROW_ALL_OR_NONE,
      }),
    onExportToExcel: () =>
      dispatch({
        type: toolsActions.EXPORT_EXCEL,
      }),
    onClearFiltering: () =>
      dispatch({
        type: datagridActions.CLEAR_FILTERING,
      }),
    onClearCache: () =>
      dispatch({
        type: datagridActions.CLEAR_CACHE,
      }),
    onClearAllCache: () =>
      dispatch({
        type: PURGE,
      }),
    onExportToPdf: () =>
      dispatch({
        type: toolsActions.EXPORT_PDF,
      }),
    onAdd: () =>
      dispatch({
        type: formActions.ADD,
      }),
    onOrderingReset: () =>
      dispatch({
        type: datagridActions.ORDERING_RESET,
      }),
    onRefresh: () =>
      dispatch({
        type: datagridActions.DATA_FETCH,
      }),
    onEdit: ({ primaryKeyValue }) =>
      dispatch({
        type: formActions.EDIT,
        primaryKeyValue,
      }),

    onRead: ({ primaryKeyValue }) =>
      dispatch({
        type: formActions.READ,
        primaryKeyValue,
      }),

    onClone: ({ primaryKeyValue }) =>
      dispatch({
        type: formActions.CLONE,
        primaryKeyValue,
      }),
    onDelete: ({ primaryKeyValue }) =>
      dispatch({
        type: formActions.DELETE,
        primaryKeyValue,
      }),
    onMultipleDeleteModalOpen: () =>
      dispatch({
        type: formActions.DELETE_MULTIPLE,
      }),
    columnOrdering: ({ columnName, sorting }) =>
      dispatch({
        type: datagridActions.COLUMN_ORDERING,
        columnName,
        sorting,
      }),

    columnSearch: ({ columnName, searchValue, searchValueDisplayAs }) =>
      dispatch({
        type: datagridActions.COLUMN_SEARCH,
        columnName,
        searchValue,
        searchValueDisplayAs,
      }),
    forceSearch: () =>
      dispatch({
        type: datagridActions.DATA_FETCH,
      }),
    perPageChange: (event) => {
      dispatch({
        type: datagridActions.PER_PAGE_CHANGE,
        perPageValue: parseInt(event.target.value, 10),
      });
    },
    pageChange: (event, currentPage, lastPage) =>
      pageChangeDispatch(
        currentPage,
        parseInt(event.target.value, 10),
        lastPage
      ),
    goToFirstPage: (currentPage, lastPage) =>
      pageChangeDispatch(currentPage, 1, lastPage),
    goToPreviousPage: (currentPage, lastPage) =>
      pageChangeDispatch(currentPage, currentPage - 1, lastPage),
    goToNextPage: (currentPage, lastPage) =>
      pageChangeDispatch(currentPage, currentPage + 1, lastPage),
    goToLastPage: (currentPage, lastPage) =>
      pageChangeDispatch(currentPage, lastPage, lastPage),
  };
};

const DatagridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Datagrid);

DatagridContainer.propTypes = {
  DatagridWrapper: PropTypes.func,
  DatagridHeader: PropTypes.func,
  DatagridBody: PropTypes.func,
  DatagridFooter: PropTypes.func,
  GroupButtons: PropTypes.func,
  DatagridCheckbox: PropTypes.func,
};

export default DatagridContainer;
