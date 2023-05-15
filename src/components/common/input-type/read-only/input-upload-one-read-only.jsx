import { getUploadOneViewUrl } from "../../../../utils/urls";

function InputUploadOneReadOnly({ value, className, id, fieldOptions }) {
  return (
    <span className={className} id={id}>
      {value ? (
        <a
          href={getUploadOneViewUrl({ fieldOptions, filename: value })}
          target="_blank"
          rel="noreferrer"
        >
          {value}
        </a>
      ) : (
        <>&nbsp;</>
      )}
    </span>
  );
}

export default InputUploadOneReadOnly;
