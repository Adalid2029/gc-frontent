import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import { getTitleTranslation } from "../../../utils/translations-helper";
import Form from "./form";
import i18n from "../../../utils/locale/i18n";
import ModalHeader from "../common/modal-header";

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
          <div className="relative px-4 w-full h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <ModalHeader
                title={getTitleTranslation(formState)}
                onClose={formModalClose}
              />
              <div className="p-6 space-y-6">
                <div className={classes["skeleton-loader"]} />
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={formModalClose}
                  className={classes["secondary-button"]}
                >
                  {i18n.t("close_modal")}
                </button>
              </div>
            </div>
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
