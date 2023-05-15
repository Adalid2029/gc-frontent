import PropTypes from "prop-types";
import ReactSelect from "./common/react-select";

function InputDropdownSearch(props) {
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

  return <ReactSelect options={options} {...props} />;
}

InputDropdownSearch.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  permittedValues: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputDropdownSearch;
