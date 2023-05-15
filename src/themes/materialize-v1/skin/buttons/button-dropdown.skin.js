import { DROPDOWN_DIRECTION } from "../../../../constants/dropdown";

const buttonDropdown = {
  "dropdown-menu": {
    composes: "dropdown-content",
    left: "auto",
    top: "auto",
    display: ({ opened }) => (opened ? "block" : "none"),
    opacity: ({ opened }) => (opened ? "1" : "0"),
    right: ({ direction }) =>
      direction === DROPDOWN_DIRECTION.RIGHT ? "0" : "auto",
  },
  "dropdown-menu-container": {
    display: "inline-flex",
    "margin-left": ({ leftSpace }) => (leftSpace ? "5px" : "0"),
  },
  "dropdown-menu-button": {
    composes: "dropdown-trigger btn",
    display: "inline-flex",
    "align-items": "center",
  },
};

export default buttonDropdown;
