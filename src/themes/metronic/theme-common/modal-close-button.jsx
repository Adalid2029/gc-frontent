const ModalCloseButton = ({ className, onClick }) => {
  return (
    <button
      type="button"
      className={className}
      data-dismiss="modal"
      aria-label="Close"
      onClick={onClick}
    />
  );
};

export default ModalCloseButton;
