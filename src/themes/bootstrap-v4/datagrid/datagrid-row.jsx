import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ActionsColumn from "../../../components/datagrid/body/actions-column";
import { formatDatagridValue } from "../../../utils/datagrid";
import bodySkin from "../skin/datagrid/body.skin";
import { createUseStyles } from "react-jss";
import Icon from "../../../components/common/icon";
import { masterDetailActions } from "../../../actions/master-detail-actions";
import MasterDetail from "../../../components/common/master-detail";

const selectLocalCode = (state) => state.configuration.locale;
const selectDateFormat = (state) => state.configuration.dateFormat;
const selectHasMasterDetail = (state) => state.configuration.hasMasterDetail;
const selectColumnWidth = (state) => state.columnWidth;
const selectOpenedRows = (state) => state.masterDetail.openedRows;

const useStyles = createUseStyles(bodySkin);

const DatagridRow = ({
  lastPrimaryKeyValue,
  rowData,
  hasActions,
  visibleColumns,
  settings,
  configurationSettings: { onRowUpdate, onRowUnmount },
  rightSideActions,
  skin,
  theme,
  ...rest
}) => {
  const locale = useSelector(selectLocalCode);
  const dateFormat = useSelector(selectDateFormat);
  const columnWidth = useSelector(selectColumnWidth);
  const hasMasterDetail = useSelector(selectHasMasterDetail);
  const openedRows = useSelector(selectOpenedRows);

  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    grocery_crud_extras: { primaryKeyValue },
  } = rowData;

  useLayoutEffect(() => {
    if (onRowUpdate) {
      onRowUpdate({ primaryKeyValue });
    }

    return () => {
      if (onRowUnmount) {
        onRowUnmount({ primaryKeyValue });
      }
    };
  }, [primaryKeyValue, rowData, onRowUpdate, onRowUnmount]);

  const ActionsTd = () => (
    <td key="column__action" className={classes["column-action"]}>
      <ActionsColumn
        {...rest}
        backendActionButtons={rowData.grocery_crud_extras.actionButtons}
        actionButtons={settings.actionButtons}
        primaryKeyValue={primaryKeyValue}
      />
    </td>
  );

  const isRowOpened =
    hasMasterDetail && openedRows.find((rowId) => rowId === primaryKeyValue);

  return (
    <>
      <tr
        className={
          lastPrimaryKeyValue &&
          lastPrimaryKeyValue === rowData.grocery_crud_extras.primaryKeyValue
            ? classes["animation-flash"]
            : undefined
        }
      >
        {hasActions && !rightSideActions && visibleColumns.length > 0 && (
          <ActionsTd />
        )}
        {visibleColumns.map((column, numRow) => (
          <td key={column.name}>
            <div
              className={classes["column-text"]}
              style={{
                width: columnWidth[column.name],
                maxWidth: columnWidth[column.name],
              }}
            >
              {hasMasterDetail && numRow === 0 && (
                <>
                  <span
                    className={classes["open-row"]}
                    onClick={() =>
                      dispatch({
                        type: isRowOpened
                          ? masterDetailActions.CLOSE_ROW
                          : masterDetailActions.OPEN_ROW,
                        rowId: primaryKeyValue,
                      })
                    }
                  >
                    <Icon icon={isRowOpened ? "caret-down" : "caret-right"} />
                  </span>
                </>
              )}
              {formatDatagridValue(rowData[column.name], column.dataType, {
                dateFormat,
                fieldName: column.name,
                fieldOptions: column.options,
                locale,
                permittedValues: column.permittedValues,
                primaryKeyValue,
              })}
            </div>
          </td>
        ))}
        {hasActions && rightSideActions && visibleColumns.length > 0 && (
          <ActionsTd />
        )}
      </tr>
      {isRowOpened && (
        <tr>
          <td colSpan={visibleColumns.length + (hasActions ? 1 : 0)}>
            <MasterDetail
              primaryKeyValue={primaryKeyValue}
              skin={skin}
              theme={theme}
            />
          </td>
        </tr>
      )}
    </>
  );
};

DatagridRow.propTypes = {
  settings: PropTypes.object,
  configurationSettings: PropTypes.object,
};

DatagridRow.defaultProps = {
  settings: {},
  configurationSettings: {},
};

export default DatagridRow;
