import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import i18n from "../../../utils/locale/i18n";
import Button from "../buttons/button";

const useStyles = createUseStyles(formDialog);

const DeleteSingleModal = (props) => {
  const { deleteOneModalOpen, deleteOneModalClose, deleteOne } = props;

  const classes = useStyles(props);

  return (
    <div className={classes["modal-delete-one"]} tabIndex="-1">
      <div className="modal-content">
        <h4>{i18n.t("action_delete")}</h4>
        <p>{i18n.t("confirm_delete")}</p>
      </div>
      {deleteOneModalOpen && (
        <div className="modal-footer">
          <Button onClick={deleteOneModalClose} label={i18n.t("cancel")} />
          <button type="button" className="btn red" onClick={deleteOne}>
            {i18n.t("action_delete")}
          </button>
        </div>
      )}
    </div>
  );
};

DeleteSingleModal.propTypes = {
  modalLoading: PropTypes.bool,
  formModalOpen: PropTypes.bool,
  formState: PropTypes.string,
};

export default DeleteSingleModal;
