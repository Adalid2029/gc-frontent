import { useLayoutEffect } from "react";

function InputBackendCallbackReadOnly({
  name: fieldName,
  value,
  id,
  onMount,
  onUnmount,
}) {
  useLayoutEffect(() => {
    if (onMount) {
      onMount({
        fieldName,
      });
    }

    return () => {
      if (onUnmount) {
        onUnmount({
          fieldName,
        });
      }
    };
  }, [onMount, onUnmount, fieldName]);

  return (
    <>
      <div
        id={id}
        dangerouslySetInnerHTML={{
          __html: value,
        }}
      />
    </>
  );
}

export default InputBackendCallbackReadOnly;
