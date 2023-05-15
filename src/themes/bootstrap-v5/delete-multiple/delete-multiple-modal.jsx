import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import i18n from "../../../utils/locale/i18n";
import { getDeleteConfirmationMessage } from "../../../utils/translations-helper";
import DatagridMiniGrid from "../datagrid/datagrid-mini-grid";

const useStyles = createUseStyles(formDialog);

const DeleteMultipleModal = (props) => {
  const {
    deleteMultipleModalOpen,
    deleteMultipleModalClose,
    deleteMultiple,
    selectedIds,
    visibleColumnsWithDetails,
    rows,
  } = props;

  const classes = useStyles({ deleteMultipleModalOpen });

  return (
    <div
      className={classes["modal-delete-multiple"]}
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
              className={classes["close-button"]}
              data-dismiss="modal"
              aria-label="Close"
              onClick={deleteMultipleModalClose}
            />
          </div>
          <div className="modal-body">
            <p>{getDeleteConfirmationMessage(selectedIds.length)}</p>
            {deleteMultipleModalOpen && (
              <DatagridMiniGrid
                visibleColumns={visibleColumnsWithDetails}
                rows={rows.filter((row) =>
                  selectedIds.includes(row.grocery_crud_extras.primaryKeyValue)
                )}
              />
            )}
          </div>
          {deleteMultipleModalOpen && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default btn-outline-dark"
                data-dismiss="modal"
                onClick={deleteMultipleModalClose}
              >
                {i18n.t("cancel")}
              </button>
              {/* making sure that we have at least one selection to remove */}
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  className="btn btn-danger delete-single-confirmation-button"
                  onClick={deleteMultiple}
                >
                  {i18n.t("action_delete")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DeleteMultipleModal.propTypes = {
  modalLoading: PropTypes.bool,
  formModalOpen: PropTypes.bool,
  formState: PropTypes.string,
};

export default DeleteMultipleModal;
