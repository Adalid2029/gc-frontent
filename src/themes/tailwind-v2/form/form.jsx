import { createUseStyles } from "react-jss";
import { useForm } from "react-hook-form";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import InputText from "../../../components/common/input-type/input-text";
import { getTitleTranslation } from "../../../utils/translations-helper";
import i18n from "../../../utils/locale/i18n";
import ModalHeader from "../common/modal-header";
import Button from "../buttons/button";

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
        <div className="relative px-4 w-full h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <ModalHeader
              title={getTitleTranslation(formState)}
              onClose={formModalClose}
            />
            <div className={classes["form-fields"]}>
              {modalLoading
                ? "Loading..."
                : formFields.map((field) => {
                    return (
                      <div className="flex px-4 py-3" key={field.fieldName}>
                        <label
                          className="w-1/4"
                          htmlFor={`gc-form-${field.fieldName}`}
                        >
                          {field.displayAs}
                        </label>
                        <div className="w-3/4">
                          <InputText
                            className="px-4 py-3 border border-gray-200 w-full"
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
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {!readOnly && (
                <>
                  <label>
                    <input type="checkbox" />
                    {/* Extra span is needed for checkbox to work for materialize UI*/}
                    {i18n.t("close_modal_on_save")}
                  </label>{" "}
                  &nbsp; &nbsp;
                </>
              )}
              <Button onClick={formModalClose} label={i18n.t("close_modal")} />
              {!readOnly && (
                <button type="submit" className={classes["primary-button"]}>
                  {i18n.t("modal_save")}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
