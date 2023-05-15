import i18n from "./locale/i18n";
import { errorActions } from "../actions/error-actions";

const errorMessageUnknownResponse = (error) => {
  const message = i18n.t("error_unknown_response");

  let details = `${error}.\n${i18n.t("error_server_response")}:\n`;

  details +=
    error.rawResponse === undefined
      ? i18n.t("error_empty_response")
      : error.rawResponse;

  console.log({
    message,
    details,
  });

  return {
    message,
    details,
  };
};

export function dispatchUnknownResponse(dispatch, error) {
  // As "Unknown Response" can be literally one of the first responses we need to give enough time for the
  // translations to be loaded. We don't want to overcomplicate things though as translation service is
  // doing some basic caching within the localForage. So worst case we can live without the translations if
  // the translations are not loaded yet.
  setTimeout(() => {
    const { message, details } = errorMessageUnknownResponse(error);
    dispatch({
      type: errorActions.RESPONSE_ERROR,
      message,
      details,
    });
  }, 200);
}
