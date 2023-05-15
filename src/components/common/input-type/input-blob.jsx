import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getBlobViewUrl } from "../../../utils/urls";
import i18n from "../../../utils/locale/i18n";
import { useState } from "react";
import { UPLOAD_FILE_NAME_PREFIX } from "../../../constants/prefix";

const selectApiUrl = (state) => state.configuration.apiUrl;
const selectPrimaryKeyValue = (state) => state.form.primaryKeyValue;

function InputBlob({
  className,
  id,
  name,
  placeholder,
  register,
  required,
  value,
}) {
  const apiUrl = useSelector(selectApiUrl);
  const primaryKeyValue = useSelector(selectPrimaryKeyValue);
  const [deleteFile, setDeleteFile] = useState(false);

  if (value && !deleteFile) {
    return (
      <div>
        <a
          href={getBlobViewUrl({ apiUrl, fieldName: name, primaryKeyValue })}
          target="_blank"
          rel="noreferrer"
        >
          {value}
        </a>
        &nbsp;
        <button
          className="btn btn-default btn-outline-dark"
          type="button"
          onClick={() => setDeleteFile(true)}
        >
          <i className="fas fa-trash"></i>&nbsp;{i18n.t("action_delete")}
        </button>
      </div>
    );
  }

  return (
    <>
      <input type="hidden" value="" {...register(name)} />
      <input
        className={className}
        id={id}
        {...register(`${name}${UPLOAD_FILE_NAME_PREFIX}`)}
        placeholder={placeholder}
        required={required}
        type="file"
      />
    </>
  );
}

InputBlob.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputBlob;
