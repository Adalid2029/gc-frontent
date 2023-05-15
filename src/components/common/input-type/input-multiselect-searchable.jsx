import PropTypes from "prop-types";
import ReactSelectMultiple from "./common/react-select-multiple";

function InputMultiselectSearchable(props) {
  const { permittedValues, value } = props;

  let options = [];

  if (permittedValues !== null) {
    Object.keys(permittedValues).forEach((optionKey) => {
      const optionLabel = permittedValues[optionKey];
      options.push({
        value: optionKey,
        label: optionLabel,
      });
    });
  }

  return (
    <ReactSelectMultiple
      {...props}
      value={Array.isArray(value) ? value : value.split(",")}
      options={options}
    />
  );
}

InputMultiselectSearchable.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  permittedValues: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default InputMultiselectSearchable;
