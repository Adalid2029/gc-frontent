const dialogJss = {
  composes: "modal modal-fixed-footer",
  opacity: "0",
  "z-index": "10",
};

const formDialog = {
  "@keyframes fadeIn": {
    "0%": { opacity: "0.1" },
    "66%": { opacity: " 0.5" },
    "100%": { opacity: "1" },
  },
  "@keyframes shine": {
    to: {
      "background-position": "100% 0",
    },
  },
  "form-dialog": {
    ...dialogJss,
    display: ({ formModalOpen }) => (formModalOpen ? "block" : "none"),
    animation: ({ formModalOpen }) =>
      formModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
  },
  "modal-delete-one": {
    ...dialogJss,
    display: ({ deleteOneModalOpen }) =>
      deleteOneModalOpen ? "block" : "none",
    animation: ({ deleteOneModalOpen }) =>
      deleteOneModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
  },
  "modal-delete-multiple": {
    ...dialogJss,
    display: ({ deleteMultipleModalOpen }) =>
      deleteMultipleModalOpen ? "block" : "none",
    animation: ({ deleteMultipleModalOpen }) =>
      deleteMultipleModalOpen
        ? "$fadeIn 0.15s ease 0s normal forwards 1"
        : "none",
  },
  "form-fields": {
    position: "relative",
    "max-height": "calc(100vh - 240px)",
  },
  "skeleton-loader": {
    width: "100%",
    height: "15px",
    border: "1px solid rgb(239,239,239)",
    "border-radius": "4px",
    display: "block",
    "background-repeat": "repeat-y",
    "background-size": "50px 500px",
    "background-position": "0 0",
    background:
      "linear-gradient(to right, rgba(239, 239, 239, 0), rgba(239, 239, 239, 0.5) 50%, rgba(239, 239, 239, 0) 80%),rgb(255,255,255)",
    animation: "$shine 2s infinite",
    "animation-delay": "0.3s",
  },
};

export default formDialog;
