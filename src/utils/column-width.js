import { columnWidthActions } from "../actions/column-width-actions";

let previousSiblingElement;
let parentThElement;
let startOffsetX;
let startClientX;
let columnWidth;
const MIN_WIDTH = 100;
const EXTRA_PADDING = 13;

export const columnWidthOnDragStart = (event) => {
  const currentTarget = event.currentTarget;

  currentTarget.closest("th").style.background = "var(--gc-dark-background)";
  currentTarget.style.opacity = "0";

  previousSiblingElement = event.currentTarget.previousSibling;
  parentThElement = event.currentTarget.closest("th");

  previousSiblingElement.style.background =
    "var(--gc-emphasis-background-color)";
  previousSiblingElement.style.right = "0";
  previousSiblingElement.style.position = "fixed";
  previousSiblingElement.style.left = event.clientX - EXTRA_PADDING + "px";
  previousSiblingElement.style.display = "block";

  startClientX = event.clientX;
  columnWidth = parentThElement.clientWidth;
  startOffsetX = parentThElement.offsetLeft + columnWidth;
};

export const columnWidthOnDrag = (event) => {
  if (previousSiblingElement !== null) {
    previousSiblingElement.style.left =
      startOffsetX + event.clientX - startClientX + "px";
  }
};

export const columnChangeWidthAction = (columnName, columnWidth, dispatch) => {
  dispatch({
    type: columnWidthActions.CHANGE_WIDTH,
    columnName,
    columnWidth,
  });
};

export const columnWidthOnDragEnd = (event, columnName, dispatch) => {
  if (parentThElement !== null) {
    parentThElement.style.removeProperty("background");
    columnChangeWidthAction(
      columnName,
      Math.max(
        columnWidth + event.clientX - startClientX - EXTRA_PADDING,
        MIN_WIDTH
      ),
      dispatch
    );
  }
  event.currentTarget.style.removeProperty("right");
  event.currentTarget.style.removeProperty("background");
  event.currentTarget.style.removeProperty("position");
  event.currentTarget.style.removeProperty("left");
  event.currentTarget.style.removeProperty("opacity");

  previousSiblingElement.style.removeProperty("right");
  previousSiblingElement.style.removeProperty("background");
  previousSiblingElement.style.removeProperty("position");
  previousSiblingElement.style.removeProperty("left");
  previousSiblingElement.style.removeProperty("opacity");

  document.body.style.removeProperty("cursor");
};
