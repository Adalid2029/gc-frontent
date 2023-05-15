import PropTypes from "prop-types";
import HtmlInput from "./common/html-input";

function InputText(props) {
  return <HtmlInput {...props} domType="text" />;
}

InputText.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputText;
