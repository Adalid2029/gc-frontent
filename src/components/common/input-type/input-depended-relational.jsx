import PropTypes from "prop-types";
import ReactSelect from "./common/react-select";
import { useSelector } from "react-redux";

function InputDependedRelational(props) {
  const { isNullable, value, name } = props;

  const permittedValues = useSelector((state) => {
    if (state.dependedRelation?.permittedValues[name]) {
      return state.dependedRelation.permittedValues[name];
    }
    return state.dependedRelation.permittedValues;
  });

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

  return <ReactSelect options={options} {...props} value={value} />;
}

InputDependedRelational.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  permittedValues: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputDependedRelational;
