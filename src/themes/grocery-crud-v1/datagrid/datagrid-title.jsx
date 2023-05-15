import { createUseStyles } from "react-jss";
import titleSkin from "../skin/datagrid/title.skin";

const useStyles = createUseStyles(titleSkin);

const DatagridTitle = (props) => {
  const { title } = props;

  const classes = useStyles(props);

  return <div className={classes["title"]}>{title}</div>;
};

export default DatagridTitle;
