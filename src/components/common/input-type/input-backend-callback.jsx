import { useController } from "react-hook-form";
import { useLayoutEffect } from "react";

function InputBackendCallback({
  control,
  name,
  value,
  id,
  onMount,
  onUnmount,
}) {
  useController({
    name,
    control,
    defaultValue: "",
    shouldUnregister: true,
  });

  useLayoutEffect(() => {
    if (onMount) {
      onMount({
        fieldName: name,
      });
    }

    return () => {
      if (onUnmount) {
        onUnmount({
          fieldName: name,
        });
      }
    };
  }, [onMount, onUnmount, name]);

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

export default InputBackendCallback;
