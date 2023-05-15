import PropTypes from "prop-types";
import HtmlSelect from "./common/html-select";

function InputDropdown(props) {
  const { isNullable, permittedValues } = props;

  let options = [];

  if (isNullable) {
    options.push({
      value: "",
      label: "",
    });
  }

  if (permittedValues !== null) {
    Object.keys(permittedValues).forEach((optionKey) => {
      const optionLabel = permittedValues[optionKey];
      options.push({
        value: optionKey,
        label: optionLabel,
      });
    });
  }

  return <HtmlSelect {...props} options={options} />;
}

InputDropdown.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  permittedValues: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputDropdown;
