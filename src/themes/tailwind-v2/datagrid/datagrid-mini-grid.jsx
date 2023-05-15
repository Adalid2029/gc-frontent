import { createUseStyles } from "react-jss";
import miniGridSkin from "../skin/datagrid/datagrid-mini.skin";
import { formatDatagridValue } from "../../../utils/datagrid";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { fieldTypes } from "../../../constants/field-types";

const useStyles = createUseStyles(miniGridSkin);

const selectLocalCode = (state) => state.configuration.locale;
const selectDateFormat = (state) => state.configuration.dateFormat;

const DatagridMiniGrid = ({ visibleColumns, rows }) => {
  const classes = useStyles();

  const locale = useSelector(selectLocalCode);
  const dateFormat = useSelector(selectDateFormat);

  return (
    <div className={classes["scrolling-wrapper"]}>
      <table className={classes["mini-grid"]}>
        <thead>
          <tr>
            {visibleColumns.map((column) =>
              column.dataType === fieldTypes.INVISIBLE ? null : (
                <th key={column.name}>{column.displayAs}</th>
              )
            )}
          </tr>
        </thead>
        <tbody className={classes["mini-grid-body"]}>
          {rows.map((rowData, numRow) => (
            <tr key={numRow}>
              {visibleColumns.map((column) =>
                column.dataType === fieldTypes.INVISIBLE ? null : (
                  <td key={column.name}>
                    <div className={classes["column-text"]}>
                      {formatDatagridValue(
                        rowData[column.name],
                        column.dataType,
                        {
                          permittedValues: column.permittedValues,
                          fieldName: column.name,
                          locale,
                          dateFormat,
                          primaryKeyValue:
                            rowData.grocery_crud_extras.primaryKeyValue,
                        }
                      )}
                    </div>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DatagridMiniGrid.propTypes = {
  rows: PropTypes.array,
  visibleColumns: PropTypes.array,
};

export default DatagridMiniGrid;
