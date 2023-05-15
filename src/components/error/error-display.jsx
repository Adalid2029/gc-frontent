import { useSelector } from "react-redux";

const selectShowError = (state) => state.error.showError;
const selectValidationError = (state) => state.error.validationError;

const selectFailureError = (state) => state.error.failureError;

const selectErrorsList = (state) => state.error.errorsList;

const ErrorDisplay = ({
  ErrorDialog,
  closeModal,
  details,
  message,
  summary,
}) => {
  const showError = useSelector(selectShowError);
  const validationError = useSelector(selectValidationError);
  const failureError = useSelector(selectFailureError);
  const errorsList = useSelector(selectErrorsList);

  if (ErrorDialog === null) {
    return null;
  }

  return (
    <ErrorDialog
      closeModal={closeModal}
      details={details}
      message={message}
      showError={showError}
      summary={summary}
      validationError={validationError}
      failureError={failureError}
      errorsList={errorsList}
    />
  );
};

export default ErrorDisplay;
