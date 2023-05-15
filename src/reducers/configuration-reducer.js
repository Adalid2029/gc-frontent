import { configurationActions } from "../actions/configuration-actions";
import { fieldTypesGroupingPerOperation } from "../utils/form-fields";
import { datagridActions } from "../actions/datagrid-actions";
import { REHYDRATE } from "redux-persist";
import { formActions } from "../actions/form-actions";
import { handleActions } from "../utils/redux-helper";
import { errorActions } from "../actions/error-actions";
import {
  getDateFormatFromLocale,
  getLocaleFromLanguage,
} from "../utils/locale/locale-helper";
import { getColumnsWithData } from "../utils/columns";

const POSITION_TOP_LEFT = "top-left";
const POSITION_TOP_RIGHT = "top-right";
const POSITION_BOTTOM_LEFT = "bottom-left";
const POSITION_BOTTOM_RIGHT = "bottom-right";

const initialState = {
  apiUrl: "",
  backendActionButtonsMultiple: [],
  datagridButtons: [],
  columns: [],
  dateFormat: "yyyy-MM-dd",
  fieldTypes: [],
  fieldTypesAddForm: [],
  fieldTypesCloneForm: [],
  fieldTypesColumns: [],
  fieldTypesEditForm: [],
  fieldTypesReadForm: [],
  hasActions: false,
  hasMasterDetail: false,
  hasSettings: false,
  hasFilters: false,
  hasExportData: false,
  hasExportPdf: false,
  hasExportExcel: false,
  hasPrint: false,
  hasColumnsButton: false,
  hasDatagridTitle: false,
  hasAdd: false,
  initError: false,
  landingPageUrl: "",
  language: "English",
  locale: "en-US",
  maxActionButtons: {
    mobile: 1,
    desktop: 2,
  },
  openInModal: true,
  options: {},
  pagingLoading: false,
  pagingOptions: [],
  rightSideActions: false,
  selectedIds: [],
  subject: "",
  subjectPlural: "",
  urlHistory: false,
  masterPrimaryKeyValue: null,
};

const removeSelectedIds = (state) => {
  return {
    ...state,
    selectedIds: [],
  };
};

const configurationReducer = handleActions(
  {
    [REHYDRATE]: (state) => {
      return {
        ...state,
        pagingLoading: true,
      };
    },

    [errorActions.RESPONSE_ERROR]: (state) => {
      return {
        ...state,
        pagingLoading: false,
      };
    },

    [configurationActions.MAIN_CONFIGURATION]: (state, action) => {
      return {
        ...state,
        apiUrl: action.apiUrl,
        landingPageUrl: action.landingPageUrl,
        masterPrimaryKeyValue: action.masterPrimaryKeyValue,
      };
    },

    [configurationActions.INIT_SUCCESS]: (state, action) => {
      const {
        actionButtonsMultiple,
        datagridButtons,
        columns,
        paging: { pagingOptions },
        operations: {
          actionButtons,
          actionButtonsMultiple: hasActionButtonsMultiple,
          add,
          clone,
          columns: hasColumnsButton,
          datagridTitle: hasDatagridTitle,
          deleteMultiple,
          deleteSingle,
          edit,
          exportData,
          exportExcel,
          exportPdf,
          filters,
          print,
          read,
          settings,
        },
        configuration: {
          actionButtonType,
          urlHistory,
          openInModal,
          maxActionButtons,
          rightSideActions,
        },
        i18n: { subject, subject_plural: subjectPlural },
        language,
        masterDetail,
      } = action.data;

      const groupedFieldTypes = fieldTypesGroupingPerOperation(action.data);

      const locale = getLocaleFromLanguage(language);

      const datagridButtonsTopLeft =
        datagridButtons.length > 0
          ? datagridButtons.filter(
              (button) => button.position === POSITION_TOP_LEFT
            )
          : [];
      const datagridButtonsTopRight =
        datagridButtons.length > 0
          ? datagridButtons.filter(
              (button) => button.position === POSITION_TOP_RIGHT
            )
          : [];
      const datagridButtonsBottomLeft =
        datagridButtons.length > 0
          ? datagridButtons.filter(
              (button) => button.position === POSITION_BOTTOM_LEFT
            )
          : [];
      const datagridButtonsBottomRight =
        datagridButtons.length > 0
          ? datagridButtons.filter(
              (button) => button.position === POSITION_BOTTOM_RIGHT
            )
          : [];

      return {
        ...state,
        backendActionButtonsMultiple: actionButtonsMultiple || [],
        datagridButtonsTopLeft: datagridButtonsTopLeft,
        datagridButtonsTopRight: datagridButtonsTopRight,
        datagridButtonsBottomLeft: datagridButtonsBottomLeft,
        datagridButtonsBottomRight: datagridButtonsBottomRight,

        columns: getColumnsWithData(
          columns,
          groupedFieldTypes.fieldTypesColumns
        ),
        dateFormat: getDateFormatFromLocale(locale),
        language,
        locale,
        pagingOptions,
        subject,
        subjectPlural,
        urlHistory,
        hasDatagridTitle,
        hasSettings: settings,
        hasFilters: filters,
        hasExportData: exportData,
        hasExportPdf: exportPdf,
        hasExportExcel: exportExcel,
        hasPrint: print,
        hasColumnsButton,
        openInModal,
        rightSideActions,
        hasMasterDetail: typeof masterDetail === "object",
        maxActionButtons,
        hasActions:
          add ||
          edit ||
          deleteSingle ||
          clone ||
          deleteMultiple ||
          read ||
          actionButtons,
        hasAdd: add,
        hasTopLeftButtons: add || datagridButtonsTopLeft,
        hasTopRightButtons:
          settings ||
          filters ||
          exportData ||
          print ||
          columns ||
          datagridButtonsTopRight,
        hasBottomLeftButtons: datagridButtonsBottomLeft,
        hasBottomRightButtons: datagridButtonsBottomRight,
        options: {
          deleteMultiple,
          hasEdit: edit,
          hasClone: clone,
          hasDelete: deleteSingle,
          hasRead: read,
          hasActionButtons: actionButtons,
          hasActionButtonsMultiple,
          actionButtonHasIcon:
            actionButtonType === "icon-text" || actionButtonType === "icon",
          actionButtonHasText:
            actionButtonType === "icon-text" || actionButtonType === "text",
        },
        ...groupedFieldTypes,
      };
    },

    [configurationActions.INIT_FAILURE]: (state) => {
      return {
        ...state,
        initError: true,
        pagingLoading: false,
      };
    },
    [configurationActions.SET_OPEN_IN_MODAL]: (state, { openInModal }) => {
      return {
        ...state,
        openInModal,
      };
    },

    [datagridActions.PAGE_CHANGE]: (state) => {
      return {
        ...state,
        pagingLoading: true,
        selectedIds: [],
      };
    },

    [datagridActions.DATA_RENDER]: (state) => {
      return {
        ...state,
        pagingLoading: false,
        selectedIds: [],
      };
    },

    [datagridActions.SELECT_ROW_TOGGLE]: (state, action) => {
      const { rowId } = action;
      let selectedIds = [...state.selectedIds];

      if (selectedIds.indexOf(rowId) > -1) {
        selectedIds = selectedIds.filter((id) => id !== rowId);
      } else {
        selectedIds.push(rowId);
      }

      return {
        ...state,
        selectedIds,
      };
    },

    [datagridActions.SELECT_ROWS]: (state, action) => {
      return {
        ...state,
        selectedIds: [...action.selectedIds],
      };
    },

    [formActions.ADD]: removeSelectedIds,
    [formActions.CLONE]: removeSelectedIds,
    [formActions.EDIT]: removeSelectedIds,
    [formActions.READ]: removeSelectedIds,
    [formActions.DELETE_ACTION_MULTIPLE_SUCCESS]: removeSelectedIds,
    [datagridActions.DATA_FETCH]: removeSelectedIds,
  },
  {
    ...initialState,
  }
);

export default configurationReducer;
