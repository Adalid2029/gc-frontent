import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import formDialog from "../skin/form-dialog/form-dialog.skin";
import i18n from "../../../utils/locale/i18n";
import { getDeleteConfirmationMessage } from "../../../utils/translations-helper";
import DatagridMiniGrid from "../datagrid/datagrid-mini-grid";
import Button from "../buttons/button";

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

  const classes = useStyles(props);

  return (
    <div
      className={classes["modal-delete-multiple"]}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className={classes["modal-dialog"]}>
        <div className={classes["modal-content"]}>
          <div className={classes["modal-header"]}>
            <h3 className={classes["modal-header-label"]}>
              {i18n.t("action_delete")}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={deleteMultipleModalClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
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
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <Button
                label={i18n.t("cancel")}
                onClick={deleteMultipleModalClose}
              />
              {/* making sure that we have at least one selection to remove */}
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  className="bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-bold py-2 px-4 rounded border border-red-500 shadow-sm"
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
