import PropTypes from "prop-types";

const SearchInputDropdown = ({
  className,
  onChange,
  value,
  permittedValues,
  required,
}) => {
  let options = [
    {
      key: "",
      label: "",
    },
  ];

  if (permittedValues !== null) {
    Object.keys(permittedValues).forEach((optionKey) => {
      const optionLabel = permittedValues[optionKey];
      options.push({
        key: optionKey,
        label: optionLabel,
      });
    });
  }

  return (
    <select
      className={className}
      onChange={onChange}
      value={value}
      required={required}
    >
      {options.map((option) => (
        <option value={option.key} key={option.key}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

SearchInputDropdown.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputDropdown;
