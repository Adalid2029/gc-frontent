import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function HtmlInput({
  control,
  name: originalName,
  value: originalValue,
  className,
  required,
  placeholder,
  id,
  fieldOptions: { maxLength } = {},
  domType,
  domStep,
}) {
  const {
    field: { onChange, onBlur, name, value },
  } = useController({
    name: originalName,
    control,
    defaultValue: originalValue,
    shouldUnregister: true,
  });

  return (
    <input
      className={className}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={domType}
      value={value}
      step={domStep}
      maxLength={maxLength}
    />
  );
}

HtmlInput.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  domType: PropTypes.string,
  domStep: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default HtmlInput;
