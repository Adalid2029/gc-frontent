const filteringDialogSkin = {
  "@keyframes fadeIn": {
    "0%": { opacity: "0.1" },
    "66%": { opacity: " 0.5" },
    "100%": { opacity: "1" },
  },
  "filtering-modal": {
    composes: "modal",
    "z-index": "10",
    display: ({ filteringModalOpen }) =>
      filteringModalOpen ? "block" : "none",
    opacity: "0",
    animation: ({ filteringModalOpen }) =>
      filteringModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
  },
  "form-fields": {
    "overflow-x": "hidden",
    "overflow-y": "auto",
    position: "relative",
    "max-height": "calc(100vh - 240px)",
  },
};

export default filteringDialogSkin;
