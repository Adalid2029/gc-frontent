import PropTypes from "prop-types";
import ReactSelect from "./common/react-select";

function InputEnumSearchable(props) {
  const { permittedValues } = props;
  let options = [
    {
      value: "",
      label: "",
    },
  ];

  if (permittedValues !== null) {
    Object.keys(permittedValues).forEach((optionKey) => {
      const optionLabel = permittedValues[optionKey];
      options.push({
        value: optionLabel,
        label: optionLabel,
      });
    });
  }

  return <ReactSelect options={options} {...props} />;
}

InputEnumSearchable.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  permittedValues: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputEnumSearchable;
