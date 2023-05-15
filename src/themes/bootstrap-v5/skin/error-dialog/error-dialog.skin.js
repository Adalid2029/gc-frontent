const errorDialog = {
  "error-dialog": {
    composes: "modal",
    ".modal&": {
      "z-index": "1100", // more than 1050 that is the default of bootstrap modal
      display: ({ showError }) => (showError ? "block" : "none"),
    },
  },
  "error-details": {
    width: "100%",
    height: "200px",
  },
};

export default errorDialog;
