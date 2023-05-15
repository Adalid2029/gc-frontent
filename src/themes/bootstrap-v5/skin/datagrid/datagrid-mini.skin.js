const widthChanging = {
  display: "block",
  position: "absolute",
  right: "-13px",
  height: "39px",
  width: "10px",
  cursor: "col-resize",
  opacity: "0.8",
  "z-index": "10",
  "&:hover": {
    background: "var(--gc-emphasis-background-color)",
    cursor: "col-resize",
  },
  "&:focus, &:active": {
    background: "transparent",
    cursor: "col-resize",
  },
};

const miniGridSkin = {
  "mini-grid": {
    composes: "table table-bordered table-hover",
    "margin-bottom": "0px",
  },
  "interactive-grid": {
    composes: "table table-bordered",
    width: ({ columnWidth }) =>
      typeof columnWidth === "object" && Object.keys(columnWidth).length > 0
        ? "auto"
        : "100%",
  },
  "scrolling-wrapper": {
    composes: "gc-mini-grid-scrolling-wrapper",
    width: "100%",
    position: "relative",
    "overflow-x": "auto",
  },
  "column-text": {
    "&>span": {
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
      overflow: "hidden",
    },
    "align-items": "center",
    "max-width": "350px",
    "min-width": "0", // small hack so we can have flex to work with ellipsis
    "vertical-align": "middle",
    display: "flex",
    height: "38px",
  },
  "mini-grid-body": {
    ".table &": {
      "border-top": "none",
    },
  },
  description: {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "margin-bottom": "10px",
  },
  "width-changing": {
    ...widthChanging,
  },
  "width-changing-last": {
    ...widthChanging,
    right: "-8px",
  },
  "header-column": {
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
    position: "relative",
    "min-width": "100px",
    "white-space": "nowrap",
    "padding-right": "10px",
  },
};

export default miniGridSkin;
