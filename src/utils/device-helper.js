export const isMobileDevice = () => {
  // For now the only indication of a mobile device is the window size.
  if (window && window.matchMedia) {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  return false;
};
