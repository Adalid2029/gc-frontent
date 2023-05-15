import { DROPDOWN_DIRECTION } from "../../../../constants/dropdown";

const buttonDropdown = {
  "dropdown-menu": {
    composes:
      "origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-gray-700 font-bold focus:outline-none",
    left: "auto",
    top: "auto",
    display: ({ opened }) => (opened ? "block" : "none"),
    opacity: ({ opened }) => (opened ? "1" : "0"),
    right: ({ direction }) =>
      direction === DROPDOWN_DIRECTION.RIGHT ? "0" : "auto",
    "margin-top": "38px",
    "z-index": "100",
  },
  "dropdown-menu-container": {
    composes: "inline-flex",
    "margin-left": ({ leftSpace }) => (leftSpace ? "5px" : "0"),
  },
  "dropdown-menu-button": {
    composes:
      "inline-flex justify-center bg-white hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded border border-gray-700 shadow-sm hover:bg-gray-100",
    "align-items": "center",
  },
};

export default buttonDropdown;
