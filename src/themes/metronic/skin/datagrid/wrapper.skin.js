const wrapperSkin = {
  wrapper: {
    composes: "table table-bordered table-hover",
    "margin-bottom": "0px",
    width: ({ columnWidth }) =>
      Object.keys(columnWidth).length > 0 ? "auto" : "100%",
  },
  "wrapper-no-hover": {
    composes: "table table-bordered",
    "margin-bottom": "0px",
    width: ({ columnWidth }) =>
      Object.keys(columnWidth).length > 0 ? "auto" : "100%",
  },
};

export default wrapperSkin;
