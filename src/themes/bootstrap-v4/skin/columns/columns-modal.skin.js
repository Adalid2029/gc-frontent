const columnsModalSkin = {
  "@keyframes fadeIn": {
    "0%": { opacity: "0.1" },
    "66%": { opacity: " 0.5" },
    "100%": { opacity: "1" },
  },
  "columns-modal": {
    composes: "modal",
    ".modal&": {
      display: ({ columnsModalOpen }) => (columnsModalOpen ? "block" : "none"),
      opacity: "0",
      animation: ({ columnsModalOpen }) =>
        columnsModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
    },
  },
  "close-button": {
    composes: "close",
    "button&": {
      cursor: "pointer",
    },
  },
  "horizontal-line": {
    "border-top": "1px solid var(--gc-border-separator-color)",
    "margin-top": "3px",
    "margin-bottom": "3px",
  },
  tabs: {
    composes: "nav nav-tabs",
    ".nav-tabs&": {
      "margin-bottom": "10px",
      "list-style": "none",
      "padding-inline-start": "unset",
    },
  },
  "tab-button": {
    composes: "nav-link",
    ".nav-link&": {
      cursor: "pointer",
    },
  },
};

export default columnsModalSkin;
