import i18n from "../../../../utils/locale/i18n";

const formDialog = {
  "@keyframes fadeIn": {
    "0%": { opacity: "0.1" },
    "66%": { opacity: " 0.5" },
    "100%": { opacity: "1" },
  },
  "@keyframes shine": {
    to: {
      "background-position": "100% 0",
    },
  },
  "form-dialog": {
    composes: "modal",
    ".modal&": {
      display: ({ formModalOpen }) => (formModalOpen ? "block" : "none"),
      opacity: "0",
      animation: ({ formModalOpen }) =>
        formModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
    },
  },
  "modal-delete-one": {
    composes: "modal",
    ".modal&": {
      display: ({ deleteOneModalOpen }) =>
        deleteOneModalOpen ? "block" : "none",
      opacity: "0",
      animation: ({ deleteOneModalOpen }) =>
        deleteOneModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
    },
  },
  "button-close": {
    composes: "close",
    "button&": {
      cursor: "pointer",
    },
  },
  "modal-delete-multiple": {
    composes: "modal",
    ".modal&": {
      display: ({ deleteMultipleModalOpen }) =>
        deleteMultipleModalOpen ? "block" : "none",
      opacity: "0",
      animation: ({ deleteMultipleModalOpen }) =>
        deleteMultipleModalOpen
          ? "$fadeIn 0.15s ease 0s normal forwards 1"
          : "none",
    },
  },
  "close-button": {
    composes: "close",
    "button&": {
      cursor: "pointer",
    },
  },
  "form-fields": {
    "overflow-x": "hidden",
    "overflow-y": "auto",
    position: "relative",
    "max-height": ({ openInModal }) =>
      openInModal ? "calc(100vh - 240px)" : undefined,
    padding: "0px 10px",
  },
  "@media (max-height: 300px)": {
    "form-fields": {
      "max-height": "none",
    },
  },
  "skeleton-loader": {
    width: "100%",
    height: "15px",
    border: "1px solid rgb(239,239,239)",
    "border-radius": "4px",
    display: "block",
    "background-repeat": "repeat-y",
    "background-size": "50px 500px",
    "background-position": "0 0",
    background:
      "linear-gradient(to right, rgba(239, 239, 239, 0), rgba(239, 239, 239, 0.5) 50%, rgba(239, 239, 239, 0) 80%),rgb(255,255,255)",
    animation: "$shine 2s infinite",
    "animation-delay": "0.3s",
  },
  "form-input-read-only": {
    padding: "7px 0px",
    border: "none",
    "background-color": "var(--gc-input-light-background)",
    "&:focus-visible, &:focus": {
      border: "none",
      outline: "none",
      "background-color": "var(--gc-input-light-background)",
    },
  },
  "form-input": {
    composes: "form-control",
  },
  "form-textarea": {
    composes: "form-control",
    "textarea&": {
      "min-height": "250px",
    },
  },
  "form-select": {
    composes: "form-control form-select",
  },
  form: {
    composes: "form-horizontal",
    position: "relative",
    "&:before": {
      display: (props) => (props.formLoadingOverlay ? "block" : "none"),
      content: (props) =>
        props.formLoadingOverlay ? `"${i18n.t("loading")}"` : "none",
      opacity: (props) => (props.formLoadingOverlay ? "0.5" : "0"),
      "font-size": "26px",
      position: "absolute",
      "text-align": "center",
      "z-index": "9999",
      color: "var(--gc-light-background-text-color)",
      background: "var(--gc-light-background)",
      cursor: "default",
      width: "100%",
      height: "100%",
    },
  },
  "full-page-title": {
    background: "var(--gc-dark-background)",
    color: "var(--gc-dark-background-text-color)",
    width: "100%",
    padding: "5px 10px",
    "text-align": "left",
  },
};

export default formDialog;
