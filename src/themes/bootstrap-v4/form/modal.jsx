import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import { getTitleTranslation } from "../../../utils/translations-helper";
import Form from "./form";

const useStyles = createUseStyles(formDialog);

const Modal = (props) => {
  const { formModalLoading, formModalClose, formState, formModalOpen } = props;

  const classes = useStyles(props);

  return (
    <div className={classes["form-dialog"]} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{getTitleTranslation(formState)}</h5>
            <button
              type="button"
              className={classes["close-button"]}
              aria-label="Close"
              onClick={formModalClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
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
    </div>
  );
};

Modal.propTypes = {
  formModalLoading: PropTypes.bool,
  formModalOpen: PropTypes.bool,
  formState: PropTypes.string,
  openInModal: PropTypes.bool,
};

Modal.defaultProps = {
  formFields: [],
  openInModal: true,
};

export default Modal;
