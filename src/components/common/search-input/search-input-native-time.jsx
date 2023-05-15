import PropTypes from "prop-types";

const SearchInputNativeTime = ({
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
      type="time"
      step="1"
      value={value}
      required={required}
    />
  );
};

SearchInputNativeTime.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputNativeTime;
