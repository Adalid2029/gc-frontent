import { createUseStyles } from "react-jss";
import Icon from "../../../components/common/icon";
import PropTypes from "prop-types";
import classNames from "classnames";
import DatagridPagingItemsLabel from "../../../components/datagrid/footer/datagrid-paging-items-label";
import footerSkin from "../skin/datagrid/footer.skin";

const useStyles = createUseStyles(footerSkin);

const DatagridFooter = (props) => {
  const classes = useStyles(props);

  const {
    filteredTotalEntries,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    lastPage,
    page: currentPage,
    pageChange,
    totalEntries,
    perPage,
    perPageChange,
    forceSearch,
    pagingLoading,
    pagingOptions,
  } = props;

  return (
    <div className={classes.footer}>
      <div className={classes["footer-child"]}>
        <div>Show</div>
        <div className="floatL r5 l5 t3 per-page-container">
          <select
            className="form-control form-select"
            onChange={perPageChange}
            value={perPage}
          >
            {pagingOptions.map((pageOption) => (
              <option key={pageOption} value={pageOption}>
                {pageOption}
              </option>
            ))}
          </select>
        </div>
        <div>entries</div>
      </div>
      <div className={classes["footer-child"]}>
        {pagingLoading && <div className={classes.loader} />}
        {filteredTotalEntries && !pagingLoading ? (
          <div>
            <DatagridPagingItemsLabel
              currentPage={currentPage}
              totalEntries={totalEntries}
              perPage={perPage}
              filteredTotalEntries={filteredTotalEntries}
            />
          </div>
        ) : null}
        <div>
          <div className={classes.pagination}>
            <button
              className={classNames(
                "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium",
                {
                  "disabled text-gray-500": currentPage === 1,
                  "cursor-pointer hover:bg-gray-50": currentPage > 1,
                }
              )}
              onClick={() => goToFirstPage(currentPage, lastPage)}
            >
              <Icon icon="step-backward" />
            </button>
            <button
              className={classNames(
                "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium",
                {
                  "disabled text-gray-500": currentPage === 1,
                  "cursor-pointer hover:bg-gray-50": currentPage > 1,
                }
              )}
              onClick={() => goToPreviousPage(currentPage, lastPage)}
            >
              <Icon icon="chevron-left" />
            </button>
            <input
              type="number"
              className={classes["page-number"]}
              value={currentPage}
              onChange={(event) => pageChange(event, currentPage, lastPage)}
              disabled={filteredTotalEntries === 0}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  forceSearch();
                }
              }}
            />
            <button
              className={classNames(
                "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium",
                {
                  "disabled text-gray-500": currentPage === lastPage,
                  "cursor-pointer hover:bg-gray-50": currentPage < lastPage,
                }
              )}
              onClick={() => goToNextPage(currentPage, lastPage)}
            >
              <Icon icon="chevron-right" />
            </button>
            <button
              className={classNames(
                "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium",
                {
                  "disabled text-gray-500": currentPage === lastPage,
                  "cursor-pointer hover:bg-gray-50": currentPage < lastPage,
                }
              )}
              onClick={() => goToLastPage(currentPage, lastPage)}
            >
              <Icon icon="step-forward" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DatagridFooter.propTypes = {
  page: PropTypes.number,
};

export default DatagridFooter;
