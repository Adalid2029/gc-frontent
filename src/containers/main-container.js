import { connect } from "react-redux";
import Main from "../components/main";
import PropTypes from "prop-types";
import { formActions } from "../actions/form-actions";
import { filteringActions } from "../actions/filtering-actions";
import { columnsActions } from "../actions/columns-actions";
import { toolsActions } from "../actions/tools-actions";
import { getVisibleColumnsWithDetails } from "../utils/columns";

const mapStateToProps = (state, ownProps) => ({
  // From state
  columns: state.configuration.columns,
  columnsModalOpen: state.columns.columnsModalOpen,
  deleteMultipleModalOpen: state.form.deleteMultipleModalOpen,
  deleteOneModalOpen: state.form.deleteOneModalOpen,
  extendedSearchData: state.datagrid.extendedSearchData,
  extendedSearchOperator: state.datagrid.extendedSearchOperator,
  filteringModalOpen: state.filtering.modalOpen,
  formFields: state.form.fields,
  formIsReadOnly: state.form.readOnly,
  formLoadingOverlay: state.form.loadingOverlay,
  formModalLoading: state.form.modalLoading,
  formModalOpen: state.form.modalOpen,
  formState: state.form.operationState,
  openInModal: state.configuration.openInModal,
  primaryKeyValue: state.form.primaryKeyValue,
  rows: state.datagridRows,
  selectedIds: state.configuration.selectedIds,
  subjectPlural: state.configuration.subjectPlural,
  visibleColumns: state.datagrid.visibleColumns,
  visibleColumnsWithDetails: getVisibleColumnsWithDetails(
    state.configuration.columns,
    state.datagrid.visibleColumns,
    state.datagrid.orderedColumns
  ),

  // From ownProps
  isMobileDevice: ownProps.isMobileDevice,
  loadCssIcons: ownProps.loadCssIcons,
  loadCssTheme: ownProps.loadCssTheme,
  loadCssThirdParty: ownProps.loadCssThirdParty,
  configurationSettings: ownProps.configurationSettings,
  skin: ownProps.skin,
  theme: ownProps.theme,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFilteringSubmit: (data) =>
      dispatch({
        type: filteringActions.FORM_SUBMIT,
        data,
      }),
    onFormSubmit: ({ formState, data }) => {
      switch (formState) {
        case formActions.EDIT: {
          dispatch({
            type: formActions.UPDATE,
            data,
          });
          break;
        }
        case formActions.CLONE:
        case formActions.ADD: {
          dispatch({
            type: formActions.INSERT,
            data,
          });
          break;
        }
        default:
          break;
      }
    },
    formModalClose: () =>
      dispatch({
        type: formActions.MODAL_CLOSE,
      }),
    deleteOneModalClose: () =>
      dispatch({
        type: formActions.DELETE_ONE_MODAL_CLOSE,
      }),
    deleteMultipleModalClose: () =>
      dispatch({
        type: formActions.DELETE_MULTIPLE_MODAL_CLOSE,
      }),
    deleteOne: () =>
      dispatch({
        type: formActions.DELETE_ACTION_ONE,
      }),
    deleteMultiple: () =>
      dispatch({
        type: formActions.DELETE_ACTION_MULTIPLE,
      }),
    onFilteringModalClose: () =>
      dispatch({
        type: filteringActions.MODAL_CLOSE,
      }),
    onColumnsModalClose: () =>
      dispatch({
        type: columnsActions.MODAL_CLOSE,
      }),
    onMultipleDeleteModalClose: () =>
      dispatch({
        type: toolsActions.MULTIPLE_DELETE_MODAL_CLOSE,
      }),
    toggleVisibleColumn: (columnName, columns) =>
      dispatch({
        type: columnsActions.TOGGLE_VISIBLE_COLUMN,
        columnName,
        columns,
      }),
    selectColumnsAllOrNone: (columns) =>
      dispatch({
        type: columnsActions.SELECT_ALL_OR_NONE,
        columns,
      }),
    changeOrdering: (columnName, sourceIndex, destinationIndex) =>
      dispatch({
        type: columnsActions.ORDERING_CHANGE,
        columnName,
        sourceIndex,
        destinationIndex,
      }),
    resetColumnsOrdering: (columns) =>
      dispatch({
        type: columnsActions.RESET_ORDERING,
        columns,
      }),
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

MainContainer.propTypes = {
  theme: PropTypes.oneOf([
    "bootstrap-v3",
    "bootstrap-v4",
    "bootstrap-v5",
    "metronic",
    "grocery-crud-v1",
    "materialize-v1",
    "tailwind-v2",
  ]),
};

export default MainContainer;
