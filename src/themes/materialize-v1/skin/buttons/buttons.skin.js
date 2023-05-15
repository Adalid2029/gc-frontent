const buttonSkin = {
  "simple-button": {
    composes: "btn",
    "margin-right": "5px",
    "margin-left": ({ leftSpace }) => (leftSpace ? "5px" : undefined),
    ".modal .modal-footer .btn&": {
      "margin-right": "5px",
      "margin-left": ({ leftSpace }) => (leftSpace ? "5px" : undefined),
    },
  },
};

export default buttonSkin;
