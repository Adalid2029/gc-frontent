import PropTypes from "prop-types";

const optionsMapping = (value, indexedPermittedValues) => {
  if (!value) {
    return "";
  }

  return value
    .map((optionId) =>
      indexedPermittedValues[optionId]
        ? indexedPermittedValues[optionId]
        : `[${optionId}]`
    )
    .join(", ");
};

function InputRelationalNtoNReadOnly({
  value,
  className,
  id,
  indexedPermittedValues = {},
}) {
  if (className) {
    return (
      <div className={className} id={id}>
        {value && Object.keys(indexedPermittedValues).length > 0 ? (
          optionsMapping(value, indexedPermittedValues)
        ) : (
          <>&nbsp;</>
        )}
      </div>
    );
  }
  return (
    <span id={id}>
      {value && Object.keys(indexedPermittedValues).length > 0 ? (
        optionsMapping(value, indexedPermittedValues)
      ) : (
        <>&nbsp;</>
      )}
    </span>
  );
}

InputRelationalNtoNReadOnly.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
  id: PropTypes.string,
};

export default InputRelationalNtoNReadOnly;
