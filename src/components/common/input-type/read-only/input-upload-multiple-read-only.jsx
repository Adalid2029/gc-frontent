import { getUploadOneViewUrl } from "../../../../utils/urls";
import { Fragment } from "react";

function InputUploadMultipleReadOnly({ value, className, id, fieldOptions }) {
  return (
    <span className={className} id={id}>
      {value ? (
        value.split(",").map((filename, index) => (
          <Fragment key={index}>
            <a
              href={getUploadOneViewUrl({ fieldOptions, filename })}
              target="_blank"
              rel="noreferrer"
            >
              {filename}
            </a>{" "}
          </Fragment>
        ))
      ) : (
        <>&nbsp;</>
      )}
    </span>
  );
}

export default InputUploadMultipleReadOnly;
