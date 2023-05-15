const headerSkin = {
  "search-column": {
    "min-width": "160px",
  },
  "table-th-with-ordering": {
    cursor: "pointer",
    "&:hover": {
      background: "var(--gc-table-hover-background)",
    },
  },
  "actions-column-header": {
    "align-items": "center",
    display: "flex",
    height: "39px",
  },
  "with-ordering": {
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
  },
  "input-text": {
    composes: "px-4 py-3 border border-gray-200 w-full",
  },
  "input-select": {
    composes: "px-4 py-3 border border-gray-200 w-full",
  },
  "input-select-search": {},
};

export default headerSkin;
