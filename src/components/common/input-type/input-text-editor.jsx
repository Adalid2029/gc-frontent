import { useController } from "react-hook-form";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { useLayoutEffect } from "react";
import { loadCSS } from "../../../utils/themes";

function InputTextEditor({
  control,
  name: originalName,
  value: originalValue,
  loadCssThirdParty,
}) {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: originalName,
    control,
    defaultValue: originalValue,
    shouldUnregister: true,
  });

  useLayoutEffect(() => {
    if (loadCssThirdParty) {
      loadCSS("react-quill-v2");
    }
  }, [loadCssThirdParty]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

InputTextEditor.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputTextEditor;
