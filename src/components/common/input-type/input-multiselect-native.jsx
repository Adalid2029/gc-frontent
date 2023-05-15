import PropTypes from "prop-types";
import HtmlSelectMultiple from "./common/html-select-multiple";

function InputMultiselectNative(props) {
  const { permittedValues } = props;

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

  return <HtmlSelectMultiple {...props} options={options} />;
}

InputMultiselectNative.propTypes = {
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

export default InputMultiselectNative;
