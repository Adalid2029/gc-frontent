import { createUseStyles } from "react-jss";
import classNames from "classnames";
import i18n from "../../../utils/locale/i18n";
import columnsModalSkin from "../skin/columns/columns-modal.skin";
import ColumnsOrdering from "./columns-ordering";
import ColumnsVisibility from "./columns-visibility";
import { useState } from "react";
import DatagridColumnWidth from "../datagrid/datagrid-column-width";

const useStyles = createUseStyles(columnsModalSkin);

const TAB_VISIBILITY = "tab-visibility";
const TAB_ORDERING = "tab-ordering";
const TAB_WIDTH = "tab-width";

const ColumnsModal = ({
  columns,
  columnsModalOpen,
  onColumnsModalClose,
  selectColumnsAllOrNone,
  toggleVisibleColumn,
  visibleColumns,
  visibleColumnsWithDetails,
  changeOrdering,
  resetColumnsOrdering,
}) => {
  const [tabSelected, setTabSelection] = useState(TAB_VISIBILITY);
  const classes = useStyles({ columnsModalOpen });

  return (
    <div className={classes["columns-modal"]} tabIndex="-1" role="dialog">
      <div
        className={classNames("modal-dialog", {
          "modal-l": tabSelected !== TAB_WIDTH,
          "w-100 mw-100": tabSelected === TAB_WIDTH,
        })}
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{i18n.t("columns")}</h5>
            <button
              type="button"
              className={classes["close-button"]}
              data-dismiss="modal"
              aria-label="Close"
              onClick={onColumnsModalClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {columnsModalOpen && (
              <>
                <ul className={classes["tabs"]}>
                  <li className="nav-item">
                    <button
                      className={classNames(classes["tab-button"], {
                        active: tabSelected === TAB_VISIBILITY,
                      })}
                      onClick={() => {
                        setTabSelection(TAB_VISIBILITY);
                      }}
                    >
                      {i18n.t("tab_visibility")}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={classNames(classes["tab-button"], {
                        active: tabSelected === TAB_ORDERING,
                      })}
                      onClick={() => {
                        setTabSelection(TAB_ORDERING);
                      }}
                    >
                      {i18n.t("tab_ordering")}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={classNames(classes["tab-button"], {
                        active: tabSelected === TAB_WIDTH,
                      })}
                      onClick={() => {
                        setTabSelection(TAB_WIDTH);
                      }}
                    >
                      {i18n.t("tab_width")}
                    </button>
                  </li>
                </ul>
                {tabSelected === TAB_VISIBILITY && (
                  <ColumnsVisibility
                    columns={columns}
                    selectColumnsAllOrNone={selectColumnsAllOrNone}
                    toggleVisibleColumn={toggleVisibleColumn}
                    visibleColumns={visibleColumns}
                    classes={classes}
                  />
                )}
                {tabSelected === TAB_ORDERING && (
                  <ColumnsOrdering
                    columns={columns}
                    toggleVisibleColumn={toggleVisibleColumn}
                    visibleColumns={visibleColumns}
                    changeOrdering={changeOrdering}
                    resetColumnsOrdering={resetColumnsOrdering}
                  />
                )}
                {tabSelected === TAB_WIDTH && (
                  <DatagridColumnWidth
                    visibleColumns={visibleColumnsWithDetails}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnsModal;
