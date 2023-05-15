import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function HtmlSelect({
  control,
  name: originalName,
  value: originalValue,
  className,
  required,
  id,
  options,
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
    <select
      required={required}
      className={className}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      id={id}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

HtmlSelect.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  domType: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
};

HtmlSelect.defaultProps = {
  options: [],
};

export default HtmlSelect;
