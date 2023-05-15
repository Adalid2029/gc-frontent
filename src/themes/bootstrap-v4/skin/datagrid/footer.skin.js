const footerSkin = {
  footer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 5px",
    "border-color": "var(--gc-border-separator-color)",
    "border-width": "1px",
    "border-style": "none none solid none",
    "@media (max-width: 768px)": {
      "flex-direction": "column",
    },
  },
  "footer-error": {
    display: "flex",
    "flex-direction": "column",
    padding: "16px 5px",
    "border-color": "var(--gc-border-separator-color)",
    "border-width": "1px",
    "border-style": "none none solid none",
  },
  "footer-child": {
    display: "flex",
    "flex-direction": ({ isMobileDevice }) =>
      isMobileDevice ? "column" : "row",
    "& > div": {
      display: "flex",
      "flex-direction": "row",
      "align-items": "center",
      padding: "5px",
      "justify-content": "end",
    },
    "& > div > div": {
      paddingRight: "5px",
    },
  },
  pagination: {
    composes: "pagination",
    ".pagination&": {
      margin: "0",
      "list-style": "none",
    },
  },
  "page-link": {
    composes: "page-link",
    ".page-link&": {
      cursor: "pointer",
    },
  },
  "page-number": {
    composes: "form-control",
    "&.form-control": {
      borderRadius: "0",
      width: "100px",
      borderLeft: "none",
      borderRight: "none",
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
  "per-page-dropdown": {
    composes: "form-control",
    "min-width": "70px",
  },
};

export default footerSkin;
