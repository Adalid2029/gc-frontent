import { createUseStyles } from "react-jss";
import i18n from "../../../utils/locale/i18n";
import columnsModalSkin from "../skin/columns/columns-modal.skin";
import Checkbox from "../common/checkbox";

const useStyles = createUseStyles(columnsModalSkin);

const ColumnsModal = ({
  columns,
  columnsModalOpen,
  onColumnsModalClose,
  selectColumnsAllOrNone,
  toggleVisibleColumn,
  visibleColumns,
}) => {
  const classes = useStyles({ columnsModalOpen });

  return (
    <div className={classes["columns-modal"]} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-l" role="document">
        <div className="modal-content">
          <h4 className="modal-title">{i18n.t("columns")}</h4>
          <div className="modal-body">
            {columnsModalOpen && (
              <>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => selectColumnsAllOrNone(columns)}
                    checked={visibleColumns.length === columns.length}
                  />
                  <span />
                </div>
                {columns.map((column) => (
                  <div key={column.name}>
                    <label>
                      <Checkbox
                        checked={visibleColumns.includes(column.name)}
                        onChange={() =>
                          toggleVisibleColumn(column.name, columns)
                        }
                      />{" "}
                      {column.displayAs}
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={onColumnsModalClose}
          >
            {i18n.t("close_modal")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnsModal;
