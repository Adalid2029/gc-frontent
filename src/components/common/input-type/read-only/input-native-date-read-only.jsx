import { formatDate } from "../../../../utils/field-types";

function InputNatvieDateReadOnly({ className, id, value }) {
  // We don't want to include the locale into the format, so we can get the local browser local
  const formattedDate = formatDate(value);

  return (
    <div className={className} id={id}>
      {formattedDate}
    </div>
  );
}

export default InputNatvieDateReadOnly;
