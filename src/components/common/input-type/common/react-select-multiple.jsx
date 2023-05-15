import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import reactSelectSkin from "../../../style/common/input-type/react-select.skin";

const animatedComponents = makeAnimated();

function ReactSelectMultiple({
  className,
  control,
  id,
  options,
  name: originalName,
  required,
  value: originalValue,
}) {
  const {
    field: { onChange, name, value },
  } = useController({
    name: originalName,
    control,
    defaultValue: originalValue,
    shouldUnregister: true,
  });

  return (
    <Select
      isMulti={true}
      required={required}
      className={className}
      components={animatedComponents}
      onChange={(event) => {
        const selectedValues = [...event].map((option) => option.value);
        onChange({ target: { name, value: selectedValues } });
      }}
      styles={reactSelectSkin}
      value={options.filter((option) => value.indexOf(option.value) !== -1)}
      name={name}
      id={id}
      options={options}
    />
  );
}

ReactSelectMultiple.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  domType: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.array,
  options: PropTypes.array,
};

ReactSelectMultiple.defaultProps = {
  options: [],
};

export default ReactSelectMultiple;
