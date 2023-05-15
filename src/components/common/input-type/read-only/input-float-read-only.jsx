function InputFloatReadOnly({ value, className, id }) {
  const formattedValue = value ? parseFloat(value).toLocaleString() : "";

  if (className) {
    return (
      <div className={className} id={id}>
        {formattedValue}
      </div>
    );
  }

  return <span id={id}>{formattedValue}</span>;
}

export default InputFloatReadOnly;
