const toolsSkin = {
  "datagrid-tools": {
    position: "relative",
    padding: "10px",
    "border-left": "1px solid var(--gc-border-separator-color)",
    "border-right": "1px solid var(--gc-border-separator-color)",
    display: "flex",
    "justify-content": "space-between",
  },
  "simple-button": {
    composes:
      "bg-white hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded border border-gray-700 shadow-sm text-gray-700 hover:bg-gray-100",
    "margin-right": "5px",
  },
  "tools-container": {
    display: "flex",
  },
};

export default toolsSkin;
