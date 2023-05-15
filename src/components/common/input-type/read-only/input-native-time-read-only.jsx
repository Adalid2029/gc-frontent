import { formatTime } from "../../../../utils/field-types";

function InputNativeTimeReadOnly({ value, className, id }) {
  const formattedDate = formatTime(value);

  return (
    <div className={className} id={id}>
      {formattedDate}
    </div>
  );
}

export default InputNativeTimeReadOnly;
