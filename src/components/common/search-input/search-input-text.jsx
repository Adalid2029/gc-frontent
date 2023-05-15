import PropTypes from "prop-types";

const SearchInputText = ({
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
      type="search"
      value={value}
      required={required}
    />
  );
};

SearchInputText.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputText;
