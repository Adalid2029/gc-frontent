import { formatDateTime } from "../../../../utils/field-types";

function InputNativeDateTimeReadOnly({ value, className, id }) {
  const formattedDate = formatDateTime(value);

  return (
    <div className={className} id={id}>
      {formattedDate}
    </div>
  );
}

export default InputNativeDateTimeReadOnly;
