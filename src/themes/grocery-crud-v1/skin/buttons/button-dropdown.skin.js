import { DROPDOWN_DIRECTION } from "../../../../constants/dropdown";
import buttonSkin from "./buttons.skin";

const buttonDropdown = {
  "dropdown-menu": {
    "margin-top": "38px",
    display: ({ opened }) => (opened ? "block" : "none"),
    right: ({ direction }) =>
      direction === DROPDOWN_DIRECTION.RIGHT ? "0" : "auto",
  },
  "dropdown-menu-container": {
    "margin-left": ({ leftSpace }) => (leftSpace ? "5px" : "0"),
    position: "relative",
    display: "inline-flex",
    "vertical-align": "middle",
  },
  "dropdown-menu-button": {
    position: "relative",
    flex: "1 1 auto",
    ...buttonSkin["simple-button"],
    "&::after": {
      display: "inline-block",
      "margin-left": "0.255em",
      "vertical-align": "0.255em",
      content: '""',
      "border-top": "0.3em solid",
      "border-right": "0.3em solid transparent",
      "border-bottom": "0",
      "border-left": "0.3em solid transparent",
      "border-top-color": "initial",
      "border-right-color": "transparent",
      "border-bottom-color": "initial",
      "border-left-color": "transparent",
    },
  },
};

export default buttonDropdown;
