import PropTypes from "prop-types";

const SearchInputRelationalSearch = ({
  className,
  onChange,
  value,
  permittedValues,
  required,
}) => {
  let options = [
    {
      value: "",
      label: "",
    },
  ];

  if (permittedValues !== null) {
    Object.keys(permittedValues).forEach((optionKey) => {
      const optionData = permittedValues[optionKey];
      options.push({
        value: optionData.id,
        label: optionData.title,
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
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

SearchInputRelationalSearch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputRelationalSearch;
