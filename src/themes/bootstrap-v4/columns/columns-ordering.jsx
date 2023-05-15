import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { createUseStyles } from "react-jss";
import columnsOrderingSkin from "../skin/columns/columns-ordering.skin";
import i18n from "../../../utils/locale/i18n";

const selectOrderedColumns = (state) => state.datagrid.orderedColumns;

const useStyles = createUseStyles(columnsOrderingSkin);

const ColumnsOrdering = ({
  columns,
  visibleColumns,
  changeOrdering,
  resetColumnsOrdering,
}) => {
  const classes = useStyles();
  const orderedColumns = useSelector(selectOrderedColumns);

  return (
    <>
      <div className={classes["description"]}>
        <div>{i18n.t("ordering_drag_column")}</div>
        <div>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => resetColumnsOrdering(columns)}
          >
            {i18n.t("reset_ordering")}
          </button>
        </div>
      </div>
      <div className={classes["horizontal-line"]}></div>
      <DragDropContext
        onDragEnd={({ source, destination, draggableId }) => {
          if (source && destination && source.index !== destination.index) {
            changeOrdering(draggableId, source.index, destination.index);
          }
        }}
      >
        <Droppable droppableId="columns">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={
                snapshot.isDraggingOver
                  ? classes["is-dragging-over"]
                  : classes["droppable-area"]
              }
            >
              {orderedColumns
                .map((columnName) =>
                  columns.find((column) => column.name === columnName)
                )
                .map((column, columnIndex) => (
                  <Draggable
                    draggableId={column.name}
                    index={columnIndex}
                    key={column.name}
                  >
                    {(provided) => (
                      <div
                        key={column.name}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={
                          visibleColumns.includes(column.name)
                            ? classes["ordering-box"]
                            : classes["ordering-box-disabled"]
                        }
                      >
                        {column.displayAs}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ColumnsOrdering;
