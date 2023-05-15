export const publishEvent = (eventName, payload = {}) => {
  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail: payload,
    })
  );
};
