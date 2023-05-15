const formDialog = {
  "form-dialog": {
    composes: "modal fade gc-form-operation-modal in show",
    display: ({ formModalOpen }) => (formModalOpen ? "block" : "none"),
  },
};

export default formDialog;
