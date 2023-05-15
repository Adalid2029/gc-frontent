import PropTypes from "prop-types";
import {
  getComponentFromDataType,
  getMountingCallbacks,
} from "../../utils/field-types";
import { useSelector } from "react-redux";

const selectPrimaryKeyValue = (state) => state.form.primaryKeyValue;

const Input = ({
  className,
  control,
  dataType,
  fieldOptions,
  id,
  isDependencyField,
  isNullable,
  loadCssThirdParty,
  name,
  permittedValues,
  readOnly,
  register,
  setValue,
  value,
  valueLabel,
  formState,
  configurationSettings,
}) => {
  const primaryKeyValue = useSelector(selectPrimaryKeyValue);

  const InputComponent = getComponentFromDataType({ dataType, readOnly });
  const { onMount, onUnmount } = getMountingCallbacks({
    configurationSettings,
    dataType,
    fieldName: name,
    formState,
  });

  return (
    <InputComponent
      className={className}
      control={control}
      fieldOptions={fieldOptions}
      id={id}
      isDependencyField={isDependencyField}
      isNullable={isNullable}
      loadCssThirdParty={loadCssThirdParty}
      name={name}
      permittedValues={permittedValues}
      primaryKeyValue={primaryKeyValue}
      register={register}
      setValue={setValue}
      value={value}
      valueLabel={valueLabel}
      onMount={onMount}
      onUnmount={onUnmount}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  dataType: PropTypes.string,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  permittedValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
};

export default Input;
