import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import bodySkin from "../skin/datagrid/body.skin";
import ActionsColumn from "../../../components/datagrid/body/actions-column";
import { formatDatagridValue } from "../../../utils/datagrid";

const useStyles = createUseStyles(bodySkin);
const selectLocalCode = (state) => state.configuration.locale;
const selectDateFormat = (state) => state.configuration.dateFormat;

const DatagridBody = (props) => {
  const locale = useSelector(selectLocalCode);
  const dateFormat = useSelector(selectDateFormat);
  const { rows, visibleColumns, hasActions, lastPrimaryKeyValue } = props;

  const classes = useStyles(props);

  return (
    <tbody className={classes["table-body"]}>
      {rows.map((rowData, numRow) => (
        <tr
          key={numRow}
          className={
            lastPrimaryKeyValue &&
            lastPrimaryKeyValue === rowData.grocery_crud_extras.primaryKeyValue
              ? classes["animation-flash"]
              : undefined
          }
        >
          {hasActions && visibleColumns.length > 0 && (
            <td key="column__action" className={classes["column-action"]}>
              <ActionsColumn
                {...props}
                primaryKeyValue={rowData.grocery_crud_extras.primaryKeyValue}
              />
            </td>
          )}
          {visibleColumns.map((column) => (
            <td key={column.name}>
              <div className={classes["column-text"]}>
                {formatDatagridValue(rowData[column.name], column.dataType, {
                  dateFormat,
                  fieldName: column.name,
                  fieldOptions: column.options,
                  locale,
                  permittedValues: column.permittedValues,
                  primaryKeyValue: rowData.grocery_crud_extras.primaryKeyValue,
                })}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

DatagridBody.propTypes = {
  visibleColumns: PropTypes.array,
  hasActions: PropTypes.bool,
  rows: PropTypes.array,
};

export default DatagridBody;
