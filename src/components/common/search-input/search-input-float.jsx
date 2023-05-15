import PropTypes from "prop-types";

const SearchInputFloat = ({
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
      type="number"
      value={value}
      required={required}
      step=".01"
    />
  );
};

SearchInputFloat.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputFloat;
