import { formatDate } from "../../../../utils/field-types";

function InputDateReadOnly({ className, id, locale, value }) {
  const formattedDate = formatDate(value, locale);

  return (
    <div className={className} id={id}>
      {formattedDate}
    </div>
  );
}

export default InputDateReadOnly;
