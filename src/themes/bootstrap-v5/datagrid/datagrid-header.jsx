import PropTypes from "prop-types";
import i18n from "../../../utils/locale/i18n";
import headerSkin from "../skin/datagrid/header.skin";
import { createUseStyles } from "react-jss";
import Icon from "../../../components/common/icon";
import {
  getSearchInputComponent,
  requireForceSearchOnChange,
} from "../../../utils/field-types";
import { getClassNamesByDataType } from "../../../utils/datagrid";
import React from "react";
import DatagridCheckbox from "./datagrid-checkbox";
import { getMultipleActionUrl } from "../../../utils/urls";
import { useSelector } from "react-redux";

const useStyles = createUseStyles(headerSkin);
const selectRightSideActions = (state) => state.configuration.rightSideActions;

const DatagridHeader = (props) => {
  const {
    columnOrdering,
    columnSearch,
    columnSearchValues,
    columnSearchValuesDisplayAs,
    extendedSearchData,
    forceSearch,
    hasActions,
    onMultipleDeleteModalOpen,
    onSelectRowAllOrNone,
    options: { actionButtonHasText, hasActionButtonsMultiple, deleteMultiple },
    selectRowsAllOrNoneChecked,
    selectedIds,
    sorting,
    sortingFor,
    visibleColumns,
    loadCssThirdParty,
    isMobileDevice,
    backendActionButtonsMultiple,
    configurationSettings: { actionButtonsMultiple },
  } = props;

  const classes = useStyles(props);

  const rightSideActions = useSelector(selectRightSideActions);

  const hasQuickSearch = extendedSearchData.length === 0;

  const isAnyColumnSearchable = visibleColumns.some(
    (column) => column.isSearchable
  );

  const hasMultipleActions =
    (deleteMultiple || hasActionButtonsMultiple) && !isMobileDevice;
  const hasSecondaryHeader = isAnyColumnSearchable || hasMultipleActions;

  const ActionsTd = () => (
    <td className={classes["column-action"]}>
      <div className={classes["actions-column-header"]}>
        {hasMultipleActions && (
          <>
            <DatagridCheckbox
              onChange={onSelectRowAllOrNone}
              checked={selectRowsAllOrNoneChecked}
            />
            {selectedIds.length > 0 && (
              <>
                <button
                  type="button"
                  className={classes["multiple-action-button"]}
                  onClick={onMultipleDeleteModalOpen}
                >
                  <Icon icon="trash" />
                  &nbsp;&nbsp;
                  {actionButtonHasText && (
                    <span>{i18n.t("action_delete")}</span>
                  )}
                </button>
                {hasActionButtonsMultiple &&
                  backendActionButtonsMultiple.map((button) => (
                    <a
                      className={classes["multiple-action-button"]}
                      href={getMultipleActionUrl({ button, selectedIds })}
                      target={button.newTab ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      <Icon icon={button.iconName} />
                      &nbsp;&nbsp;
                      <span>{button.label}</span>
                    </a>
                  ))}
                {actionButtonsMultiple &&
                  actionButtonsMultiple.map((button) => (
                    <button
                      className={classes["multiple-action-button"]}
                      onClick={() => {
                        if (button.onClick) {
                          button.onClick({ selectedIds });
                        }
                      }}
                    >
                      <Icon icon={button.iconName} />
                      &nbsp;&nbsp;
                      <span>{button.label}</span>
                    </button>
                  ))}
              </>
            )}
          </>
        )}
      </div>
    </td>
  );

  return (
    <thead>
      <tr>
        {hasActions && !rightSideActions && visibleColumns.length > 0 && (
          <th className={classes["column-action"]}>{i18n.t("actions")}</th>
        )}
        {visibleColumns.map((column, numRow) => (
          <th
            className={classes["table-th-with-ordering"]}
            key={column.name}
            onClick={() =>
              columnOrdering({
                columnName: column.name,
                sorting: sorting === "" || sorting === "desc" ? "asc" : "desc",
              })
            }
          >
            <div className={classes["with-ordering"]}>
              <span>{column.displayAs}</span>
              {sortingFor === column.name ? (
                <Icon
                  icon={
                    sorting === "asc"
                      ? "sort-amount-down-alt"
                      : "sort-amount-down"
                  }
                />
              ) : (
                <Icon icon="sort" />
              )}
            </div>
          </th>
        ))}
        {hasActions && rightSideActions && visibleColumns.length > 0 && (
          <th>{i18n.t("actions")}</th>
        )}
      </tr>
      {hasSecondaryHeader && (
        <tr>
          {hasActions && !rightSideActions && visibleColumns.length > 0 && (
            <ActionsTd />
          )}
          {visibleColumns.map((column) => {
            const InputSearchComponent = getSearchInputComponent(
              column.dataType
            );

            return (
              <td key={column.name} className={classes["search-column"]}>
                {hasQuickSearch && column.isSearchable && (
                  <InputSearchComponent
                    className={
                      classes[getClassNamesByDataType(column.dataType)]
                    }
                    placeholder={i18n.t("quick_search")}
                    permittedValues={column.permittedValues}
                    loadCssThirdParty={loadCssThirdParty}
                    onChange={(event) => {
                      columnSearch({
                        columnName: column.name,
                        searchValue:
                          typeof event.target.value === "object"
                            ? event.target.value.key
                            : event.target.value,
                        searchValueDisplayAs:
                          typeof event.target.value === "object"
                            ? event.target.value.displayAs
                            : "",
                      });
                      if (
                        requireForceSearchOnChange(column.dataType) === true
                      ) {
                        forceSearch();
                      }
                    }}
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        forceSearch();
                      }
                    }}
                    value={
                      columnSearchValues[column.name]
                        ? columnSearchValues[column.name]
                        : ""
                    }
                    displayAs={
                      columnSearchValuesDisplayAs[column.name]
                        ? columnSearchValuesDisplayAs[column.name]
                        : ""
                    }
                    fieldName={column.name}
                  />
                )}
              </td>
            );
          })}
          {hasActions && rightSideActions && visibleColumns.length > 0 && (
            <ActionsTd />
          )}
        </tr>
      )}
    </thead>
  );
};

DatagridHeader.propTypes = {
  actionButtonsMultiple: PropTypes.array,
  columnSearchValues: PropTypes.object,
  columnSearchValuesDisplayAs: PropTypes.object,
  configurationSettings: PropTypes.object,
  extendedSearchData: PropTypes.array,
  hasActions: PropTypes.bool,
  options: PropTypes.object,
  selectedIds: PropTypes.array,
  visibleColumns: PropTypes.array,
};

DatagridHeader.defaultProps = {
  actionButtonsMultiple: [],
  columnSearchValues: {},
  columnSearchValuesDisplayAs: {},
  configurationSettings: { actionButtonsMultiple: [] },
  extendedSearchData: [],
  hasActions: false,
  options: { actionButtonHasText: true, hasActionButtonsMultiple: false },
  selectedIds: [],
  visibleColumns: [],
};

export default DatagridHeader;
