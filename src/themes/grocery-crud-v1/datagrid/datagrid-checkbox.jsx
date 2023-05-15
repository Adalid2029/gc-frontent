import { createUseStyles } from "react-jss";
import checkboxSkin from "../skin/datagrid/checkbox.skin";

const useStyles = createUseStyles(checkboxSkin);

const DatagridCheckbox = ({ onChange, checked }) => {
  const classes = useStyles();

  return (
    <input
      type="checkbox"
      className={classes["checkbox"]}
      onChange={onChange}
      checked={checked}
    />
  );
};

export default DatagridCheckbox;
