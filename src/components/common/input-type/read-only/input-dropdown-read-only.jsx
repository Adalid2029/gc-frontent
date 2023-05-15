import PropTypes from "prop-types";

function InputDropdownReadOnly({ value, className, id, permittedValues }) {
  return (
    <div className={className} id={id}>
      {permittedValues && permittedValues[value]
        ? permittedValues[value]
        : value}
    </div>
  );
}

InputDropdownReadOnly.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default InputDropdownReadOnly;
