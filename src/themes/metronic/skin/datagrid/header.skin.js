const headerSkin = {
  "search-column": {
    "min-width": "160px",
    "vertical-align": "middle",
  },
  "multiple-action-button": {
    composes: "btn btn-default btn-outline-dark",
    display: "inline-flex",
    "margin-right": "5px",
    "vertical-align": "middle",
    "align-items": "center",
  },
  "table-th-with-ordering": {
    cursor: "pointer",
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
    position: "relative",
  },

  "input-text": {
    composes: "form-control",
  },
  "input-select": {
    composes: "form-control form-select",
  },
  "input-select-search": {},
  "column-action": {
    "white-space": "nowrap",
    "border-left": "none",
  },
};

export default headerSkin;
