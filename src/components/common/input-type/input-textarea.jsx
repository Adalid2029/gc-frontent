import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function InputTextarea({
  control,
  name: originalName,
  value: originalValue,
  className,
  required,
  placeholder,
  id,
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
    <textarea
      className={className}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      value={value}
    />
  );
}

InputTextarea.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputTextarea;
