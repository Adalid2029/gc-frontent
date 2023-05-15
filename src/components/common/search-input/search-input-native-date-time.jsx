import PropTypes from "prop-types";

const SearchInputNativeDateTime = ({
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
      type="datetime-local"
      value={value}
      required={required}
    />
  );
};

SearchInputNativeDateTime.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputNativeDateTime;
