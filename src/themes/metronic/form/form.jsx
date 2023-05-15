import { createUseStyles } from "react-jss";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import formDialog from "../skin/form-dialog/form-dialog.skin";
import i18n from "../../../utils/locale/i18n";
import { formSubmitTransformation } from "../../../utils/form-fields";
import InputContainer from "../../../components/common/input-container";
import { formActions } from "../../../actions/form-actions";

const selectCloseModalOnSave = (state) => state.form.closeModalOnSave;

const useStyles = createUseStyles(formDialog);

const Form = ({
  configurationSettings,
  formFields,
  formIsReadOnly: readOnly,
  formLoadingOverlay,
  formModalClose,
  formState,
  loadCssThirdParty,
  modalLoading,
  onFormSubmit,
}) => {
  const closeModalOnSave = useSelector(selectCloseModalOnSave);
  const openInModal = useSelector((state) => state.configuration.openInModal);
  const dispatch = useDispatch();
  const { handleSubmit, control, register, setValue } = useForm();

  const onSubmit = (data) => {
    const transformedData = formSubmitTransformation(data, formFields);

    onFormSubmit({
      formState,
      data: transformedData,
    });
  };
  const onError = (errors, e) => console.log(errors, e);

  const classes = useStyles({
    formFields,
    formLoadingOverlay,
    formModalClose,
    modalLoading,
    readOnly,
    openInModal,
  });

  return (
    <form
      className={classes["form"]}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className={classes["form-fields"]}>
        {modalLoading
          ? "Loading..."
          : formFields.map((field) => {
              return (
                <InputContainer
                  control={control}
                  field={field}
                  inputContainerClassName="col-sm-9"
                  jssClasses={classes}
                  key={field.fieldName}
                  labelClassName="col-sm-3 col-form-label"
                  labelContainerClassName="mb-3 row"
                  loadCssThirdParty={loadCssThirdParty}
                  readOnly={readOnly}
                  register={register}
                  setValue={setValue}
                  configurationSettings={configurationSettings}
                  formState={formState}
                />
              );
            })}
      </div>
      <div className="modal-footer">
        {!readOnly && (
          <>
            <label className="options-on-save">
              <input
                type="checkbox"
                checked={closeModalOnSave}
                onChange={() =>
                  dispatch({
                    type: formActions.TOGGLE_CLOSE_MODAL_ON_SAVE,
                  })
                }
              />{" "}
              {i18n.t("close_modal_on_save")}
            </label>{" "}
            &nbsp; &nbsp;
          </>
        )}
        <button
          type="button"
          className="btn btn-default btn-outline-dark"
          data-dismiss="modal"
          onClick={formModalClose}
        >
          {i18n.t("close_modal")}
        </button>
        {!readOnly && (
          <button type="submit" className="btn btn-primary">
            {i18n.t("modal_save")}
          </button>
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  configurationSettings: PropTypes.object,
};

Form.defaultProps = {
  configurationSettings: {},
};

export default Form;
