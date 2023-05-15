import { formatDateTime } from "../../../../utils/field-types";

function InputDateTimeReadOnly({ value, className, id, locale }) {
  const formattedDate = formatDateTime(value, locale);

  return (
    <div className={className} id={id}>
      {formattedDate}
    </div>
  );
}

export default InputDateTimeReadOnly;
