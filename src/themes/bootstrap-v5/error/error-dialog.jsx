import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import errorDialog from "../skin/error-dialog/error-dialog.skin";
import i18n from "../../../utils/locale/i18n";

const useStyles = createUseStyles(errorDialog);

const ErrorDialog = ({
  closeModal,
  showError,
  details,
  message,
  validationError,
  failureError,
  errorsList,
}) => {
  const classes = useStyles({ showError });

  const serverError = !failureError && !validationError;

  return (
    <div
      className={classes["error-dialog"]}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{i18n.t("error_generic_title")}</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            />
          </div>
          <div className="modal-body">
            {validationError && (
              <ul>
                {Object.values(errorsList).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            {failureError && <div>{message}</div>}
            {serverError && (
              <>
                <div>
                  {i18n.t("error_message")}: {message}
                </div>
                <div>{i18n.t("error_text")}:</div>
                <div>
                  <textarea
                    defaultValue={details || ""}
                    className={classes["error-details"]}
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default btn-outline-dark"
              data-dismiss="modal"
              onClick={closeModal}
            >
              {i18n.t("close_modal")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorDialog.propTypes = {
  formModalLoading: PropTypes.bool,
  formModalOpen: PropTypes.bool,
  formState: PropTypes.string,
};

ErrorDialog.defaultProps = {
  formFields: [],
};

export default ErrorDialog;
