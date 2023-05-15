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

const useStyles = createUseStyles(headerSkin);

const DatagridHeader = (props) => {
  const {
    DatagridCheckbox,
    columnOrdering,
    columnSearch,
    columnSearchValues,
    extendedSearchData,
    forceSearch,
    hasActions,
    onMultipleDeleteModalOpen,
    onSelectRowAllOrNone,
    options: { actionButtonHasText },
    selectRowsAllOrNoneChecked,
    selectedIds,
    sorting,
    sortingFor,
    visibleColumns,
    loadCssThirdParty,
  } = props;

  const classes = useStyles(props);

  const hasQuickSearch = extendedSearchData.length === 0;

  return (
    <thead>
      <tr>
        {hasActions && visibleColumns.length > 0 && (
          <th>{i18n.t("actions")}</th>
        )}
        {visibleColumns.map((column) => (
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
      </tr>
      <tr>
        {hasActions && visibleColumns.length > 0 && (
          <td>
            <div className={classes["actions-column-header"]}>
              <DatagridCheckbox
                onChange={onSelectRowAllOrNone}
                checked={selectRowsAllOrNoneChecked}
              />
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  className="btn btn-default btn-outline-dark"
                  onClick={onMultipleDeleteModalOpen}
                >
                  <Icon icon="trash" />
                  &nbsp;&nbsp;
                  {actionButtonHasText && (
                    <span>{i18n.t("action_delete")}</span>
                  )}
                </button>
              )}
            </div>
          </td>
        )}
        {visibleColumns.map((column) => {
          const InputSearchComponent = getSearchInputComponent(column.dataType);

          return (
            <td key={column.name} className={classes["search-column"]}>
              {hasQuickSearch && (
                <InputSearchComponent
                  className={classes[getClassNamesByDataType(column.dataType)]}
                  placeholder={i18n.t("quick_search")}
                  permittedValues={column.permittedValues}
                  loadCssThirdParty={loadCssThirdParty}
                  onChange={(event) => {
                    columnSearch({
                      columnName: column.name,
                      searchValue: event.target.value,
                      searchValueDisplayAs: event.target.displayAs,
                    });
                    if (requireForceSearchOnChange(column.dataType) === true) {
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
                />
              )}
            </td>
          );
        })}
      </tr>
    </thead>
  );
};

DatagridHeader.propTypes = {
  hasActions: PropTypes.bool,
  visibleColumns: PropTypes.array,
};

DatagridHeader.defaultProps = {
  hasActions: false,
  visibleColumns: [],
  options: {
    actionButtonHasText: true,
  },
};

export default DatagridHeader;
