import { useSelector } from "react-redux";
import { getBlobViewUrl } from "../../../../utils/urls";

const selectApiUrl = (state) => state.configuration.apiUrl;

function InputBlobReadOnly({
  value,
  primaryKeyValue,
  name: fieldName,
  className,
  id,
}) {
  const apiUrl = useSelector(selectApiUrl);

  if (className) {
    return (
      <div className={className} id={id}>
        <a
          href={getBlobViewUrl({ apiUrl, fieldName, primaryKeyValue })}
          target="_blank"
          rel="noreferrer"
        >
          {value}
        </a>
      </div>
    );
  }

  return (
    <span id={id}>
      {value ? (
        <a
          href={getBlobViewUrl({ apiUrl, fieldName, primaryKeyValue })}
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

export default InputBlobReadOnly;
