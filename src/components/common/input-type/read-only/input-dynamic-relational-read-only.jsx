function InputDynamicRelationalReadOnly({ valueLabel, className, id }) {
  if (className) {
    return (
      <div className={className} id={id}>
        {valueLabel}
      </div>
    );
  }

  return <span id={id}>{valueLabel}</span>;
}

export default InputDynamicRelationalReadOnly;
