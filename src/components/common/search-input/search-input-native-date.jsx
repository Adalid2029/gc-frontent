import PropTypes from "prop-types";

const SearchInputNativeDate = ({
  className,
  onChange,
  onKeyUp,
  placeholder,
  value,
  required,
}) => {
  return (
    <input
      className={className}
      onChange={onChange}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
      type="date"
      value={value}
      required={required}
    />
  );
};

SearchInputNativeDate.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputNativeDate;
