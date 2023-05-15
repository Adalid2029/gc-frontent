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
    composes:
      "hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0",
    display: ({ formModalOpen }) => (formModalOpen ? "block" : "none"),
    opacity: "0",
    "z-index": "10",
    animation: ({ formModalOpen }) =>
      formModalOpen ? "$fadeIn 0.15s ease 0s normal forwards 1" : "none",
  },
  "primary-button": {
    composes:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  },
  "secondary-button": {
    composes:
      "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600",
  },
  "form-fields": {
    composes: "w-full md:w-auto overflow-auto",
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
  "modal-delete-one": {
    composes:
      "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full",
    display: ({ deleteOneModalOpen }) =>
      deleteOneModalOpen ? "block" : "none",
  },
  "modal-delete-multiple": {
    composes:
      "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full",
    display: ({ deleteMultipleModalOpen }) =>
      deleteMultipleModalOpen ? "block" : "none",
  },
  "modal-header": {
    composes:
      "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600",
  },
  "modal-header-label": {
    composes: "text-xl font-semibold text-gray-900 dark:text-white",
  },
  "modal-dialog": {
    composes: "relative p-4 w-full max-w-2xl h-full md:h-auto",
  },
  "modal-content": {
    composes: "relative bg-white rounded-lg shadow dark:bg-gray-700",
  },
};

export default formDialog;
