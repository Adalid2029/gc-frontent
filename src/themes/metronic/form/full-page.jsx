import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import { getTitleTranslation } from "../../../utils/translations-helper";
import Form from "./form";

const useStyles = createUseStyles(formDialog);

const FullPage = (props) => {
  const { formModalLoading, formState, formModalOpen } = props;

  const classes = useStyles(props);

  return (
    <div className={classes["full-page"]} tabIndex="-1">
      <div className={classes["full-page-title"]}>
        {getTitleTranslation(formState)}
      </div>
      <div>
        {formModalOpen && (
          <div className="modal-body">
            {formModalLoading ? (
              <div className={classes["skeleton-loader"]} />
            ) : (
              <Form {...props} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

FullPage.propTypes = {
  formModalLoading: PropTypes.bool,
  formModalOpen: PropTypes.bool,
  formState: PropTypes.string,
  openInModal: PropTypes.bool,
};

FullPage.defaultProps = {
  formFields: [],
  openInModal: true,
};

export default FullPage;
