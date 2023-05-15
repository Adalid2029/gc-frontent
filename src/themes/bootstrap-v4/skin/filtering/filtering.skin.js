const filteringSkin = {
  "filtering-row": {
    composes: "row",
    "padding-top": "10px",
    "padding-bottom": "10px",
  },
  "filtering-column": {
    // hardcoding the color here since we have an issue with third party components that inherits the color from the parent
    color: "#212529",
  },
  "form-input": {
    composes: "form-control",
  },
  "form-select": {
    composes: "form-control",
  },
  "close-button": {
    composes: "close",
    "button&": {
      cursor: "pointer",
    },
  },
};

export default filteringSkin;
