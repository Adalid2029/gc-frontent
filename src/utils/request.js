import request from "superagent";

const METHOD_GET = "get";
const METHOD_POST = "post";

const ajaxRequest = (options, methodType) => {
  const myRequest =
    methodType === "post"
      ? request.post(options.url)
      : request.get(options.url);

  const requestExtraHeaders = window?.GroceryCrudConfiguration?.requestHeaders;

  if (requestExtraHeaders !== undefined) {
    Object.keys(requestExtraHeaders).forEach((headerName) =>
      myRequest.set(headerName, requestExtraHeaders[headerName])
    );
  }

  if (methodType === "post") {
    Object.keys(options.dataToSend).forEach((fieldName) => {
      const fieldValue = options.dataToSend[fieldName];
      if (typeof fieldValue === "object") {
        Object.keys(fieldValue).forEach((subFieldName) => {
          const subFieldValue = fieldValue[subFieldName];
          if (subFieldValue instanceof File) {
            myRequest.field(subFieldName, subFieldValue);
          } else if (typeof subFieldValue === "object") {
            // The reason that we have the if statement here is that we don't want to send null values
            if (subFieldValue !== null) {
              Object.keys(subFieldValue).forEach((arrayFieldKeyName) => {
                const arrayFieldValue = subFieldValue[arrayFieldKeyName];
                myRequest.field(
                  `${fieldName}[${subFieldName}][${arrayFieldKeyName}]`,
                  arrayFieldValue === null ? "" : arrayFieldValue
                );
              });
            }
          } else {
            myRequest.field(
              `${fieldName}[${subFieldName}]`,
              subFieldValue ? subFieldValue : ""
            );
          }
        });
      } else {
        myRequest.field(fieldName, fieldValue ? fieldValue : "");
      }
    });
  } else {
    myRequest.query(new URLSearchParams(options.dataToSend).toString());
  }

  return myRequest;
};

export const sendGetRequest = (options) => {
  return ajaxRequest(options, METHOD_GET);
};

export const sendPostRequest = (options) => {
  return ajaxRequest(options, METHOD_POST);
};
