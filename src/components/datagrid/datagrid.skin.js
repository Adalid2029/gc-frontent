import i18n from "../../utils/locale/i18n";

const datagridSkin = {
  datagrid: {
    position: "relative",
    width: "100%",
    "overflow-x": "auto",
  },
  "datagrid-loading": {
    position: "relative",
    "max-width": "100vw",
    "border-left": "1px solid var(--gc-border-separator-color)",
    "border-right": "1px solid var(--gc-border-separator-color)",
    "&:before": {
      display: (props) => (props.loading ? "block" : "none"),
      content: (props) => (props.loading ? `"${i18n.t("loading")}"` : "none"),
      opacity: (props) => (props.loading ? "0.5" : "0"),
      "font-size": "26px",
      position: "absolute",
      color: "var(--gc-light-background-text-color)",
      "text-align": "center",
      "z-index": "9999",
      background: "var(--gc-light-background)",
      cursor: "default",
      width: "100%",
      height: "100%",
    },
  },
};

export default datagridSkin;
