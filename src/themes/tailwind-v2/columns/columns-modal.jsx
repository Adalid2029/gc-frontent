import { createUseStyles } from "react-jss";
import i18n from "../../../utils/locale/i18n";
import columnsModalSkin from "../skin/columns/columns-modal.skin";

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
          <div className="modal-header">
            <h5 className="modal-title">{i18n.t("columns")}</h5>
            <button
              type="button"
              className="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onColumnsModalClose}
            />
          </div>
          <div className="modal-body">
            {columnsModalOpen && (
              <>
                <div>
                  <input
                    type="checkbox"
                    onChange={() => selectColumnsAllOrNone(columns)}
                    checked={visibleColumns.length === columns.length}
                  />
                </div>
                {columns.map((column) => (
                  <div key={column.name}>
                    <label>
                      <input
                        type="checkbox"
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
      </div>
    </div>
  );
};

export default ColumnsModal;
