import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import bodySkin from "../skin/datagrid/body.skin";
import DatagridRow from "./datagrid-row";

const useStyles = createUseStyles(bodySkin);

const selectRows = (state) => state.datagridRows;
const selectRightSideActions = (state) => state.configuration.rightSideActions;

const DatagridBody = (props) => {
  const rows = useSelector(selectRows);
  const rightSideActions = useSelector(selectRightSideActions);

  const classes = useStyles();

  return (
    <tbody className={classes["table-body"]}>
      {rows.map((rowData, numRow) => (
        <DatagridRow
          key={numRow}
          rowData={rowData}
          rightSideActions={rightSideActions}
          {...props}
        />
      ))}
    </tbody>
  );
};

DatagridBody.propTypes = {
  rows: PropTypes.array,
};

export default DatagridBody;
