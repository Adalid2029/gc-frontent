import { createUseStyles } from "react-jss";
import formDialog from "../skin/form-dialog/form-dialog.skin";

const useStyles = createUseStyles(formDialog);

const FormDialog = (props) => {
  // const { modalLoading, formModalClose } = props;

  const classes = useStyles(props);

  return <div className={classes["dialog-form"]} />;
};

export default FormDialog;
