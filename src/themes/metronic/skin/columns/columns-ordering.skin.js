const orderingBox = {
  position: "relative",
  padding: "16px",
  "margin-bottom": "5px",
  background: "var(--gc-light-background)",
  color: "var(--gc-default-text-color)",
  border: "1px solid var(--gc-border-separator-color)",
  "border-radius": "4px",
};

const columnsOrderingSkin = {
  "ordering-box": {
    ...orderingBox,
  },
  "ordering-box-disabled": {
    ...orderingBox,
    opacity: 0.5,
  },
  "horizontal-line": {
    "border-top": "1px solid var(--gc-border-separator-color)",
    "margin-top": "5px",
    "margin-bottom": "5px",
  },
  "droppable-area": {
    background: "var(--gc-light-background)",
    padding: "4px",
  },
  "is-dragging-over": {
    background: "var(--gc-dark-background)",
    padding: "4px",
  },
  description: {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
  },
};

export default columnsOrderingSkin;
