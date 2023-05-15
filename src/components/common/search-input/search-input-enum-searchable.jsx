import PropTypes from "prop-types";
import Select from "react-select";
import reactSelectSkin from "../../style/common/input-type/react-select.skin";

const SearchInputEnumSearchable = ({
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
      const optionLabel = permittedValues[optionKey];
      options.push({
        value: optionLabel,
        label: optionLabel,
      });
    });
  }

  return (
    <Select
      className={className}
      onChange={(event) => {
        onChange({ target: { value: event.value } });
      }}
      styles={reactSelectSkin}
      value={options.filter((option) => option.value === value)}
      options={options}
      required={required}
    />
  );
};

SearchInputEnumSearchable.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputEnumSearchable;
