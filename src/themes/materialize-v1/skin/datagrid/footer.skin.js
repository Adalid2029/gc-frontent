const footerSkin = {
  footer: {
    display: "flex",
    padding: "5px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "footer-child": {
    display: "flex",
    alignItems: "center",
    "& > div": {
      paddingRight: "5px",
    },
  },
  pagination: {
    composes: "pagination",
    margin: "0",
  },
  "pagination-item": {
    composes: "waves-effect",
    // More specific to override the default values
    "& input.gc-page-input[type=number]": {
      width: "100px",
      height: "32px",
      padding: "6px 12px",
      margin: "0",
      "box-sizing": "border-box",
    },
  },
  "pagination-button": {
    // More specific to override the default values
    "& i.fas": {
      "font-size": "18px",
    },
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  loader: {
    border: "4px solid #f3f3f3",
    "border-radius": "50%",
    "border-top": "4px solid #3498db",
    width: "16px",
    height: "16px",
    "-webkit-animation": "$spin 2s linear infinite" /* Safari */,
    animation: "$spin 2s linear infinite",
    "margin-right": "10px",
  },
};

export default footerSkin;
