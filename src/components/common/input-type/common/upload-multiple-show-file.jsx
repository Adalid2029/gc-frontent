import PropTypes from "prop-types";
import { getUploadOneViewUrl } from "../../../../utils/urls";
import i18n from "../../../../utils/locale/i18n";

function UploadMultipleShowFile({ value, fieldOptions, onDelete }) {
  return (
    <div>
      <a
        href={getUploadOneViewUrl({ fieldOptions, filename: value })}
        target="_blank"
        rel="noreferrer"
      >
        {value}
      </a>
      &nbsp;
      <button
        className="btn btn-default btn-outline-dark"
        type="button"
        onClick={onDelete}
      >
        <i className="fas fa-trash"></i>&nbsp;{i18n.t("action_delete")}
      </button>
    </div>
  );
}

UploadMultipleShowFile.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  domType: PropTypes.string,
  domStep: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default UploadMultipleShowFile;
