import { createUseStyles } from "react-jss";

import wrapperSkin from "../skin/datagrid/wrapper.skin";

const useStyles = createUseStyles(wrapperSkin);

const DatagridWrapper = (props) => {
  const classes = useStyles(props);

  return <table className={classes.wrapper}>{props.children}</table>;
};

export default DatagridWrapper;
