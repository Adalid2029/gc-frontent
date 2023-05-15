function InputRelationalReadOnly({ value, className, id, permittedValues }) {
  let formattedValue = value;

  Object.keys(permittedValues).forEach((valueKey) => {
    const valueObject = permittedValues[valueKey];

    if (valueObject.id === value) {
      formattedValue = valueObject.title;
    }
  });

  if (className) {
    return (
      <div className={className} id={id}>
        {formattedValue}
      </div>
    );
  }

  return <span id={id}>{formattedValue}</span>;
}

export default InputRelationalReadOnly;
