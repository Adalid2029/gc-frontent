import PropTypes from "prop-types";
import { useState } from "react";
import UploadOneShowFile from "./common/upload-one-show-file";
import { UPLOAD_FILE_NAME_PREFIX } from "../../../constants/prefix";

function InputUpload({
  className,
  id,
  name,
  placeholder,
  register,
  required,
  value,
  setValue,
  fieldOptions,
  control,
}) {
  const [deleteFile, setDeleteFile] = useState(false);

  return (
    <>
      <input type="hidden" value={value} {...register(name)} />
      {value && !deleteFile ? (
        <UploadOneShowFile
          {...{
            onDelete: () => {
              setDeleteFile(true);
              setValue(name, "");
            },
            fieldOptions,
            value,
            name,
            control,
          }}
        />
      ) : (
        <input
          className={className}
          id={id}
          {...register(`${name}${UPLOAD_FILE_NAME_PREFIX}`)}
          placeholder={placeholder}
          required={required}
          type="file"
        />
      )}
    </>
  );
}

InputUpload.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputUpload;
