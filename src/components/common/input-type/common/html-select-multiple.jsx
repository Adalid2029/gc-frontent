import { useController } from "react-hook-form";
import PropTypes from "prop-types";

function HtmlSelectMultiple({
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
      onChange={(event) => {
        const selectedValues = [...event.target.options]
          .filter((option) => option.selected)
          .map((option) => option.value);
        onChange(selectedValues);
      }}
      onBlur={onBlur}
      value={value ? value : []}
      name={name}
      id={id}
      multiple={true}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

HtmlSelectMultiple.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  domType: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

HtmlSelectMultiple.defaultProps = {
  options: [],
};

export default HtmlSelectMultiple;
