import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import i18n from "../../../utils/locale/i18n";

const useStyles = createUseStyles(formDialog);

const DeleteSingleModal = (props) => {
  const { deleteOneModalOpen, deleteOneModalClose, deleteOne } = props;

  const classes = useStyles(props);

  return (
    <div
      className={classes["modal-delete-one"]}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{i18n.t("action_delete")}</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={deleteOneModalClose}
            />
          </div>
          <div className="modal-body">
            <p>{i18n.t("confirm_delete")}</p>
          </div>
          {deleteOneModalOpen && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default btn-outline-dark"
                data-dismiss="modal"
                onClick={deleteOneModalClose}
              >
                {i18n.t("cancel")}
              </button>
              <button
                type="button"
                className="btn btn-danger delete-single-confirmation-button"
                onClick={deleteOne}
              >
                {i18n.t("action_delete")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DeleteSingleModal.propTypes = {
  modalLoading: PropTypes.bool,
  formModalOpen: PropTypes.bool,
  formState: PropTypes.string,
};

export default DeleteSingleModal;
