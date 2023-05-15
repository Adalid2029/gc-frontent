const bodySkin = {
  "@keyframes flash": {
    "0%": { opacity: "1" },
    "25%": { opacity: "0" },
    "50%": { opacity: "1" },
    "75%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  "animation-flash": {
    animation: "$flash 1s ease 0s normal forwards 1",
    position: "relative",
    "z-index": "1",
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
  "column-action": {
    "white-space": "nowrap",
    "border-left": "none",
  },
  "table-body": {
    ".table &": {
      "border-top": "none",
    },
  },
  "open-row": {
    cursor: "pointer",
    padding: "0 5px",
    "min-width": "28px",
  },
};

export default bodySkin;
