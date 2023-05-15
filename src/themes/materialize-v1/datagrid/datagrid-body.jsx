import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

import bodySkin from "../skin/datagrid/body.skin";
import ActionsColumn from "../../../components/datagrid/body/actions-column";

const useStyles = createUseStyles(bodySkin);

const DatagridBody = (props) => {
  const { rows, visibleColumns, hasActions } = props;

  const classes = useStyles(props);

  return (
    <tbody>
      {rows.map((rowData, numRow) => (
        <tr key={numRow}>
          {hasActions && (
            <td key="column__action" className={classes["column-action"]}>
              <ActionsColumn
                {...props}
                primaryKeyValue={rowData.grocery_crud_extras.primaryKeyValue}
              />
            </td>
          )}
          {visibleColumns.map((column) => (
            <td key={column.name}>
              {rowData[column.name] ? rowData[column.name] : <>&nbsp;</>}
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
