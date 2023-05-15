import { createUseStyles } from "react-jss";
import toolsSkin from "../skin/datagrid/tools.skin";
import Icon from "../../../components/common/icon";
import {
  getFiltersTranslation,
  getTitleTranslation,
} from "../../../utils/translations-helper";
import { formActions } from "../../../actions/form-actions";
import i18n from "../../../utils/locale/i18n";
import ButtonDropdown from "../buttons/button-dropdown";
import { DROPDOWN_DIRECTION } from "../../../constants/dropdown";
import { excelExportUrl, pdfExportUrl, printUrl } from "../../../utils/urls";
import Button from "../buttons/button";
import { useDispatch, useSelector } from "react-redux";
import { columnsActions } from "../../../actions/columns-actions";
import FatalErrorMessage from "../../../components/common/error/fatal-error-message";

const useStyles = createUseStyles(toolsSkin);

const onColumnsModalOpen = (dispatch) =>
  dispatch({
    type: columnsActions.MODAL_OPEN,
  });

const DatagridTools = (props) => {
  const {
    apiUrl,
    columnSearchValues,
    extendedSearchData,
    hasAdd,
    onAdd,
    onClearCache,
    onClearFiltering,
    onFilteringModalOpen,
    onOrderingReset,
    onRefresh,
    sorting,
    sortingFor,
    subject,
    visibleColumnsAsShortString,
  } = props;

  const classes = useStyles(props);
  const dispatch = useDispatch();
  const hasSettings = useSelector((state) => state.configuration.hasSettings);
  const hasPrint = useSelector((state) => state.configuration.hasPrint);
  const hasFilters = useSelector((state) => state.configuration.hasFilters);
  const hasColumnsButton = useSelector(
    (state) => state.configuration.hasColumnsButton
  );
  const hasExportData = useSelector(
    (state) => state.configuration.hasExportData
  );
  const hasExportPdf = useSelector((state) => state.configuration.hasExportPdf);
  const hasExportExcel = useSelector(
    (state) => state.configuration.hasExportExcel
  );

  const hasDatagridTools = hasAdd;

  const dataForExport = {
    apiUrl,
    columnSearchValues,
    sorting,
    sortingFor,
    visibleColumnsAsShortString,
    extendedSearchData,
  };

  try {
    return hasDatagridTools ? (
      <div className={classes["datagrid-tools"]}>
        {hasAdd && (
          <Button
            link={true}
            href="/add"
            icon="plus"
            label={getTitleTranslation(formActions.ADD, subject)}
            onClick={(event) => {
              event.preventDefault();
              onAdd();
            }}
          />
        )}
        <div>
          {hasFilters && (
            <button
              className={
                extendedSearchData.length > 0
                  ? classes["success-button"]
                  : classes["simple-button"]
              }
              onClick={onFilteringModalOpen}
            >
              <Icon icon="filter"></Icon>&nbsp;
              {getFiltersTranslation(extendedSearchData.length)}
            </button>
          )}
          {hasFilters && extendedSearchData.length > 0 && (
            <button
              className={classes["danger-button"]}
              onClick={onClearFiltering}
            >
              <Icon icon="eraser"></Icon>&nbsp;
              {i18n.t("filtering_remove_filters")}
            </button>
          )}
          {hasColumnsButton && (
            <Button
              onClick={() => onColumnsModalOpen(dispatch)}
              label={i18n.t("columns")}
              icon="list-alt"
            />
          )}
          {hasPrint && (
            <a
              className={classes["simple-button"]}
              href={printUrl(dataForExport)}
              rel="noreferrer"
              target="_blank"
            >
              <Icon icon="print"></Icon>&nbsp;
              {i18n.t("print")}
            </a>
          )}
          {hasExportData && (
            <ButtonDropdown
              buttons={[
                hasExportExcel && {
                  icon: "file-excel",
                  text: "Excel",
                  url: excelExportUrl(dataForExport),
                  newTab: true,
                  key: "excel",
                },
                hasExportPdf && {
                  icon: "file-pdf",
                  text: "PDF",
                  url: pdfExportUrl(dataForExport),
                  newTab: true,
                  key: "pdf",
                },
              ]}
              buttonLabel={i18n.t("export_to_file")}
              buttonIcon="download"
              leftSpace={true}
            />
          )}
          {hasSettings && (
            <ButtonDropdown
              leftSpace={true}
              direction={DROPDOWN_DIRECTION.RIGHT}
              buttons={[
                {
                  icon: "broom",
                  text: i18n.t("clear_cache"),
                  onClick: onClearCache,
                  key: "clear_cache",
                },
                {
                  icon: "eraser",
                  text: i18n.t("clear_filtering"),
                  onClick: onClearFiltering,
                  key: "clear_filtering",
                },
                {
                  icon: "unlink",
                  text: i18n.t("reset_ordering"),
                  onClick: onOrderingReset,
                  key: "reset_ordering",
                },
                {
                  icon: "sync-alt",
                  text: i18n.t("refresh"),
                  onClick: onRefresh,
                  key: "refresh",
                },
              ]}
              buttonLabel={i18n.t("settings")}
              buttonIcon="cog"
            />
          )}
        </div>
      </div>
    ) : null;
  } catch (error) {
    console.log(error);
    return <FatalErrorMessage />;
  }
};

export default DatagridTools;
