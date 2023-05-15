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
    margin: "0",
    display: "flex",
    "padding-left": 0,
    "list-style": "none",
  },
  "pagination-item-first": {
    "& button": {
      backgroundColor: "#fff",
      padding: "6px 12px",
      border: (props) =>
        props.page === 1 ? "1px solid #dee2e6" : "1px solid #6c757d",
      color: (props) => (props.page === 1 ? "#6c757d" : "#0d6efd"),
      pointerEvents: (props) => (props.page === 1 ? "none" : "auto"),
    },
  },
  "pagination-item-last": {
    "& button": {
      backgroundColor: "#fff",
      padding: "6px 12px",
      border: (props) =>
        props.page === props.lastPage
          ? "1px solid #dee2e6"
          : "1px solid #6c757d",
      color: (props) => (props.page === props.lastPage ? "#6c757d" : "#0d6efd"),
      pointerEvents: (props) =>
        props.page === props.lastPage ? "none" : "auto",
    },
  },
  "page-number": {
    borderRadius: "0",
    width: "100px",
    borderLeft: "none",
    borderRight: "none",
    padding: "6px 12px",
    border: "1px solid #ced4da",
    lineHeight: "1.5",
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
