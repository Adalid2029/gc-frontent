const miniGridSkin = {
  "mini-grid": {
    composes: "table table-bordered table-hover",
    "margin-bottom": "0px",
  },
  "scrolling-wrapper": {
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
};

export default miniGridSkin;
