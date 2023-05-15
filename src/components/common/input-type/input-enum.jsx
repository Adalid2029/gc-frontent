import PropTypes from "prop-types";
import HtmlSelect from "./common/html-select";

function InputEnum(props) {
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

  return <HtmlSelect {...props} options={options} />;
}

InputEnum.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  permittedValues: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputEnum;
