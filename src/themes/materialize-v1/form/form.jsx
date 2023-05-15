import { createUseStyles } from "react-jss";
import { useForm } from "react-hook-form";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import InputText from "../../../components/common/input-type/input-text";
import { getTitleTranslation } from "../../../utils/translations-helper";
import i18n from "../../../utils/locale/i18n";

const useStyles = createUseStyles(formDialog);

const Form = ({
  modalLoading,
  formModalClose,
  formFields,
  formState,
  onFormSubmit,
  readOnly,
}) => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    onFormSubmit({ formState, data });
  };
  const onError = (errors, e) => console.log(errors, e);

  const classes = useStyles({ modalLoading, formModalClose, formFields });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="modal-content">
          <h4>{getTitleTranslation(formState)}</h4>
          <div className={classes["form-fields"]}>
            {modalLoading
              ? "Loading..."
              : formFields.map((field) => {
                  return (
                    <div className="row" key={field.fieldName}>
                      <label htmlFor={`gc-form-${field.fieldName}`}>
                        {field.displayAs}
                      </label>
                      <div>
                        <InputText
                          className="form-control"
                          name={field.fieldName}
                          value={field.fieldValue}
                          control={control}
                          id={`form-${field.fieldName}`}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="modal-footer">
          {!readOnly && (
            <>
              <label>
                <input type="checkbox" />
                <span />
                {/* Extra span is needed for checkbox to work for materialize UI*/}
                {i18n.t("close_modal_on_save")}
              </label>{" "}
              &nbsp; &nbsp;
            </>
          )}
          <button
            type="button"
            className="modal-close waves-effect waves-green btn-flat"
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
    </>
  );
};

export default Form;
