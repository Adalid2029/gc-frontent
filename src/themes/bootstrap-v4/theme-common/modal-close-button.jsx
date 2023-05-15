const ModalCloseButton = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={className}
      data-dismiss="modal"
      aria-label="Close"
      onClick={onClick}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
};

export default ModalCloseButton;
