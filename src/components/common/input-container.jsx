import PropTypes from "prop-types";
import Input from "./input";
import { fieldTypes } from "../../constants/field-types";
import { getJssNameFromType } from "../../utils/field-types";
const InputContainer = ({
  control,
  field,
  inputClassName,
  inputContainerClassName,
  jssClasses,
  labelClassName,
  labelContainerClassName,
  loadCssThirdParty,
  readOnly,
  register,
  setValue,
  configurationSettings,
  formState,
}) => {
  const isReadOnly = readOnly || field.isReadOnly;
  const isVisibleField = field.dataType !== fieldTypes.HIDDEN;

  if (isVisibleField) {
    return (
      <div className={labelContainerClassName}>
        <label
          className={labelClassName}
          htmlFor={`gc-form-${field.fieldName}`}
        >
          {field.isRequired && <span>*</span>}
          {field.displayAs}
        </label>
        <div className={inputContainerClassName}>
          <Input
            className={
              jssClasses[getJssNameFromType(field.dataType, isReadOnly)]
            }
            control={control}
            dataType={field.dataType}
            fieldOptions={field.options || {}}
            id={`gc-form-${field.fieldName}`}
            isDependencyField={field.isDependencyField}
            isNullable={field.isNullable}
            loadCssThirdParty={loadCssThirdParty}
            name={field.fieldName}
            permittedValues={field.permittedValues}
            readOnly={isReadOnly}
            register={register}
            setValue={setValue}
            value={field.fieldValue}
            valueLabel={field.valueLabel}
            formState={formState}
            configurationSettings={configurationSettings}
          />
        </div>
      </div>
    );
  }

  // Not visible fields (e.g. hidden)
  return (
    <Input
      className={inputClassName}
      control={control}
      dataType={field.dataType}
      id={`gc-form-${field.fieldName}`}
      isNullable={field.isNullable}
      name={field.fieldName}
      readOnly={isReadOnly}
      value={field.fieldValue}
    />
  );
};

InputContainer.propTypes = {
  jssClasses: PropTypes.object,
};

InputContainer.defaultProps = {
  jssClasses: {},
};

export default InputContainer;
