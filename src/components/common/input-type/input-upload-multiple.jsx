import PropTypes from "prop-types";
import { useState } from "react";
import UploadMultipleShowFile from "./common/upload-multiple-show-file";
import { UPLOAD_FILE_NAME_PREFIX } from "../../../constants/prefix";

function InputUploadMultiple({
  className,
  fieldOptions,
  id,
  name,
  placeholder,
  register,
  required,
  setValue,
  value,
}) {
  const [files, setFiles] = useState(value ? value.split(",") : []);

  return (
    <>
      <div>
        <input
          className={className}
          id={id}
          {...register(`${name}${UPLOAD_FILE_NAME_PREFIX}`)}
          placeholder={placeholder}
          required={required}
          type="file"
          multiple={true}
        />
        <input
          type="hidden"
          value={files.join(",")}
          name={name}
          {...register(name)}
        />
      </div>
      {files.length > 0 && (
        <div>
          {files.map((file, index) => {
            return (
              <UploadMultipleShowFile
                {...{
                  onDelete: () => {
                    const filteredFiles = files.filter((_, i) => i !== index);
                    setFiles(filteredFiles);
                    setValue(name, filteredFiles.join(","));
                  },
                  fieldOptions,
                  value: file,
                  name: `${name}[${index}]`,
                  key: index,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

InputUploadMultiple.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputUploadMultiple;
