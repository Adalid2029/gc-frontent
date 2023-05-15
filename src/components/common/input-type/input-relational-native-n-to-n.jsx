import PropTypes from "prop-types";
import HtmlSelectMultiple from "./common/html-select-multiple";

function InputRelationalNativeNtoN(props) {
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
      const optionData = permittedValues[optionKey];
      options.push({
        value: optionData.id,
        label: optionData.title,
      });
    });
  }

  return <HtmlSelectMultiple options={options} {...props} />;
}

InputRelationalNativeNtoN.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  permittedValues: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.array,
};

export default InputRelationalNativeNtoN;
