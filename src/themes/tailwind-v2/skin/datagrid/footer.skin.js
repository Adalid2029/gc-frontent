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
    composes: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
    margin: "0",
  },
  "page-number": {
    composes:
      "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium",
    borderRadius: "0",
    width: "100px",
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
