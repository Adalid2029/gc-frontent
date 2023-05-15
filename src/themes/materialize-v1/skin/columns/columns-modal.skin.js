const columnsModalSkin = {
  "@keyframes fadeIn": {
    "0%": { opacity: "0.1" },
    "66%": { opacity: " 0.5" },
    "100%": { opacity: "1" },
  },
  "columns-modal": {
    composes: "modal",
    display: ({ columnsModalOpen }) => (columnsModalOpen ? "block" : "none"),
    opacity: "0",
    "z-index": "10",
    animation: ({ columnsModalOpen }) =>
      columnsModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
  },
  "form-fields": {
    "overflow-x": "hidden",
    "overflow-y": "auto",
    position: "relative",
    "max-height": "calc(100vh - 240px)",
  },
};

export default columnsModalSkin;
