import { createUseStyles } from "react-jss";
import miniGridSkin from "../skin/datagrid/datagrid-mini.skin";
import PropTypes from "prop-types";
import { fieldTypes } from "../../../constants/field-types";
import {
  columnChangeWidthAction,
  columnWidthOnDrag,
  columnWidthOnDragEnd,
  columnWidthOnDragStart,
} from "../../../utils/column-width";
import { useDispatch, useSelector } from "react-redux";
import { columnWidthActions } from "../../../actions/column-width-actions";
import i18n from "../../../utils/locale/i18n";

const useStyles = createUseStyles(miniGridSkin);
const selectColumnWidth = (state) => state.columnWidth;

const DatagridColumnWidth = ({ visibleColumns }) => {
  const columnWidth = useSelector(selectColumnWidth);

  const classes = useStyles({ columnWidth });

  const dispatch = useDispatch();

  return (
    <>
      <div className={classes["description"]}>
        <div>{i18n.t("column_width_drag")}&nbsp;</div>
        <div>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() =>
              dispatch({
                type: columnWidthActions.RESET_COLUMN_WIDTH,
              })
            }
          >
            {i18n.t("reset_column_width")}
          </button>
        </div>
      </div>
      <div className={classes["scrolling-wrapper"]}>
        <table className={classes["interactive-grid"]}>
          <thead>
            <tr>
              {visibleColumns.map((column, numRow) =>
                column.dataType === fieldTypes.INVISIBLE ? null : (
                  <th key={column.name}>
                    <div
                      className={classes["header-column"]}
                      style={{
                        width: columnWidth[column.name],
                        maxWidth: columnWidth[column.name],
                      }}
                    >
                      <div
                        className={
                          visibleColumns[numRow + 1]
                            ? classes["width-changing"]
                            : classes["width-changing-last"]
                        }
                        style={{
                          display: "none",
                        }}
                      ></div>
                      <div
                        className={
                          visibleColumns[numRow + 1]
                            ? classes["width-changing"]
                            : classes["width-changing-last"]
                        }
                        draggable={true}
                        onDragStart={columnWidthOnDragStart}
                        onDrag={columnWidthOnDrag}
                        onDragEnd={(event) =>
                          columnWidthOnDragEnd(event, column.name, dispatch)
                        }
                      ></div>
                      <span>{column.displayAs}</span>
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <br />
        <p>{i18n.t("column_width_set_width_manually")}</p>
      </div>
      <div>
        {visibleColumns.map((column) => {
          const columnWidthValue = columnWidth[column.name]
            ? columnWidth[column.name].replace("px", "")
            : "";

          return (
            <div className="mb-3 row" key={column.name}>
              <label
                className="col-sm-2 col-form-label"
                for={`gc-column-width-${column.name}`}
              >
                {column.displayAs}
              </label>
              <div className="col-sm-2">
                <input
                  type="number"
                  value={columnWidthValue}
                  name={`gc-column-width-${column.name}`}
                  className="form-control"
                  onChange={(event) =>
                    columnChangeWidthAction(
                      column.name,
                      event.target.value,
                      dispatch
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

DatagridColumnWidth.propTypes = {
  rows: PropTypes.array,
  visibleColumns: PropTypes.array,
};

export default DatagridColumnWidth;
