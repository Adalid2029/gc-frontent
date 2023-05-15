import { DROPDOWN_DIRECTION } from "../../../../constants/dropdown";

const buttonDropdown = {
  "dropdown-menu": {
    composes: "dropdown-menu",
    ".dropdown-menu&": {
      display: ({ opened }) => (opened ? "block" : "none"),
      right: ({ direction }) =>
        direction === DROPDOWN_DIRECTION.RIGHT ? "0" : "auto",
    },
  },
  "dropdown-menu-container": {
    composes: "btn-group",
    "margin-left": ({ leftSpace }) => (leftSpace ? "5px" : "0"),
  },
  "dropdown-menu-button": {
    composes: "btn btn-outline-dark dropdown-toggle",
  },
};

export default buttonDropdown;
