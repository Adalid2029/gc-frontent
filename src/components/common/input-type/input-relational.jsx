import PropTypes from "prop-types";
import ReactSelect from "./common/react-select";

function InputRelational(props) {
  const { permittedValues } = props;

  let options = [
    {
      value: "",
      label: "",
    },
  ];

  if (permittedValues !== null) {
    Object.keys(permittedValues).forEach((optionKey) => {
      const optionData = permittedValues[optionKey];
      options.push({
        value: optionData.id,
        label: optionData.title,
      });
    });
  }

  return <ReactSelect options={options} {...props} />;
}

InputRelational.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  permittedValues: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputRelational;
