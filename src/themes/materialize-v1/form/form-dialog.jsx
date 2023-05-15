import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import { getTitleTranslation } from "../../../utils/translations-helper";
import Form from "./form";
import i18n from "../../../utils/locale/i18n";

const useStyles = createUseStyles(formDialog);

const FormDialog = (props) => {
  const {
    modalLoading,
    formModalClose,
    formFields,
    formState,
    onFormSubmit,
    formIsReadOnly,
  } = props;

  const classes = useStyles(props);

  return (
    <div className={classes["form-dialog"]} tabIndex="-1">
      {modalLoading ? (
        <>
          <div className="modal-content">
            <h4>{getTitleTranslation(formState)}</h4>
            <div className={classes["skeleton-loader"]} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={formModalClose}
            >
              {i18n.t("close_modal")}
            </button>
          </div>
        </>
      ) : (
        <Form
          formFields={formFields}
          formModalClose={formModalClose}
          modalLoading={modalLoading}
          formState={formState}
          onFormSubmit={onFormSubmit}
          readOnly={formIsReadOnly}
        />
      )}
    </div>
  );
};

FormDialog.propTypes = {
  modalLoading: PropTypes.bool,
  formModalOpen: PropTypes.bool,
  formState: PropTypes.string,
  formFields: PropTypes.array,
};

FormDialog.defaultProps = {
  formFields: [],
};

export default FormDialog;
