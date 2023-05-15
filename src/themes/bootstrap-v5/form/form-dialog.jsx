import Modal from "./modal";
import FullPage from "./full-page";
import { useSelector } from "react-redux";

const FormDialog = ({ ...props }) => {
  const openInModal = useSelector((state) => state.configuration.openInModal);
  return openInModal ? <Modal {...props} /> : <FullPage {...props} />;
};

export default FormDialog;
