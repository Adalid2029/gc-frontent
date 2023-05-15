import { createUseStyles } from "react-jss";
import wrapperSkin from "../skin/datagrid/wrapper.skin";
import { useSelector } from "react-redux";
import { selectColumnWidth } from "../../../selectors/column-width";

const useStyles = createUseStyles(wrapperSkin);
const selectOpenedRows = (state) => state.masterDetail.openedRows;

const DatagridWrapper = ({ children }) => {
  const columnWidth = useSelector(selectColumnWidth);
  const openedRows = useSelector(selectOpenedRows);
  const classes = useStyles({ columnWidth, openedRows });

  return (
    <table
      className={
        openedRows.length > 0 ? classes["wrapper-no-hover"] : classes.wrapper
      }
    >
      {children}
    </table>
  );
};

export default DatagridWrapper;
