import PropTypes from "prop-types";

const optionsMapping = (value, permittedValues) => {
  return value
    .map((optionValue) =>
      permittedValues[optionValue] ? permittedValues[optionValue] : optionValue
    )
    .join(", ");
};

function InputMultipleReadOnly({ value, className, id, permittedValues }) {
  if (className) {
    return (
      <div className={className} id={id}>
        {value && permittedValues ? (
          optionsMapping(value, permittedValues)
        ) : (
          <>&nbsp;</>
        )}
      </div>
    );
  }
  return (
    <span id={id}>
      {value && permittedValues ? (
        optionsMapping(value, permittedValues)
      ) : (
        <>&nbsp;</>
      )}
    </span>
  );
}

InputMultipleReadOnly.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
  id: PropTypes.string,
};

export default InputMultipleReadOnly;
